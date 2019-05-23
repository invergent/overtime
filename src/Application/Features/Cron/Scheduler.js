import { CronJob } from 'cron';
import cronstrue from 'cronstrue';
import services from '../utilities/services';
import ClaimHelpers from '../utilities/helpers/ClaimHelpers';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';
import Dates from '../utilities/helpers/Dates';

const { ClaimService, SettingService, TenantService } = services;

const ScheduledJobs = {};

class Scheduler {
  static fetchAllSettings() {
    return SettingService.fetchAllSettings();
  }

  static async scheduleJobs() {
    const settings = await Scheduler.fetchAllSettings();

    settings.forEach((setting) => {
      const { tenantRef, emailSchedule } = setting;
      Scheduler.scheduleAJob(tenantRef, emailSchedule);
    });
  }

  static async checkPendingClaims(tenantRef) {
    const pendingClaims = await ClaimService.fetchClaimsByTenantRef(tenantRef[0], 'Awaiting');
    if (pendingClaims.length) {
      Scheduler.triggerEmailNotification(tenantRef[0], pendingClaims);
    }
  }

  static triggerEmailNotification(tenantRef, staffWithPendingClaim) {
    const filteredStaff = ClaimHelpers.filterReminderPendingClaims(staffWithPendingClaim);
    notifications.emit(eventNames.Reminder, [tenantRef, filteredStaff]);
  }

  static updateCronJob(tenantRef, cronTime) {
    Scheduler.stopJobIfRunning(tenantRef);
    ScheduledJobs[tenantRef] = Scheduler.scheduleAJob(tenantRef, cronTime);

    // convert cron time to words
    return cronstrue.toString(cronTime);
  }

  static scheduleAJob(tenantRef, cronTime) {
    Scheduler.stopJobIfRunning(tenantRef);
    const job = new CronJob(cronTime, Scheduler.checkPendingClaims, [tenantRef]);
    job.start();

    // store jobs for future reference
    ScheduledJobs[tenantRef] = job;
  }

  static stopJobIfRunning(tenantRef) {
    const runningJob = ScheduledJobs[tenantRef];
    if (runningJob) runningJob.stop();
  }

  static async updateTenantsStatistics() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const tenants = await TenantService.fetchAllTenants();
    const { year, month } = Dates.getCurrentYearMonth();

    tenants.forEach(async (tenant) => {
      console.log(month);
      const claims = await ClaimService.fetchCompletedClaim(tenant.ref);
      const statPayload = { [months[month]]: claims.length };
      
      if (month === 0) {
        statPayload.tenantRef = tenant.ref;
        statPayload.year = year;
        return ClaimService.createChartStatistics(statPayload);
      }
      return ClaimService.updateChartStatistics(tenant.ref, statPayload);
    });
  }

  static scheduleStatsUpdateJob() {
    // run statistics update on the 27th of every month
    const job = new CronJob('0 2 27 * *', Scheduler.updateTenantsStatistics);
    job.start();
  }
}

export default { Scheduler, ScheduledJobs };
