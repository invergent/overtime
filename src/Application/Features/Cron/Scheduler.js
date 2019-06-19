import { CronJob } from 'cron';
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
      const {
        tenantRef, emailSchedule, overtimeWindowStart, overtimeWindowEnd
      } = setting;
      Scheduler.scheduleAJob(tenantRef, 'emailSchedule', emailSchedule);
      Scheduler.scheduleAJob(tenantRef, 'overtimeWindowStart', overtimeWindowStart);
      Scheduler.scheduleAJob(tenantRef, 'overtimeWindowEnd', overtimeWindowEnd);
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

  static updateCronJob(tenantRef, scheduleType, schedule) {
    Scheduler.stopJobIfRunning(tenantRef, scheduleType);
    if (scheduleType === 'emailSchedule') {
      Scheduler.scheduleAJob(tenantRef, scheduleType, schedule.emailSchedule);
    } else {
      Scheduler.scheduleAJob(tenantRef, 'overtimeWindowStart', schedule.overtimeWindowStart);
      Scheduler.scheduleAJob(tenantRef, 'overtimeWindowEnd', schedule.overtimeWindowEnd);
    }
  }

  static scheduleAJob(tenantRef, scheduleType, cronTime) {
    // initialise tenant property
    if (!ScheduledJobs[tenantRef]) ScheduledJobs[tenantRef] = {};

    let job;

    if (scheduleType === 'emailSchedule') {
      job = new CronJob(cronTime, Scheduler.checkPendingClaims, [tenantRef]);
    } else {
      job = new CronJob(cronTime, SettingService.updateOvertimeWindow, [tenantRef, scheduleType]);
    }
    job.start();

    // store jobs for future reference
    ScheduledJobs[tenantRef][scheduleType] = job;
  }

  static stopJobIfRunning(tenantRef, scheduleType) {
    const runningJobs = ScheduledJobs[tenantRef];
    if (!runningJobs) return;

    if (scheduleType === 'emailSchedule') {
      runningJobs[scheduleType].stop();
    } else {
      runningJobs.overtimeWindowStart.stop();
      runningJobs.overtimeWindowEnd.stop();
    }
  }

  static async updateTenantsStatistics() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const tenants = await TenantService.fetchAllTenants();
    const { year, month } = Dates.getCurrentYearMonth();

    tenants.forEach(async (tenant) => {
      const claims = await ClaimService.fetchCompletedClaim(tenant.ref);
      const statPayload = { [months[month]]: claims.length };
      
      if (month === 0) {
        // if it is a new year, create a new record
        statPayload.tenantRef = tenant.ref;
        statPayload.year = year;
        return ClaimService.createChartStatistics(statPayload);
      }
      return ClaimService.updateChartStatistics(tenant.ref, statPayload);
    });
  }

  static scheduleStatsUpdateJob() {
    // run statistics update by 2:00 on the 27th of every month
    const job = new CronJob('0 2 27 * *', Scheduler.updateTenantsStatistics);
    job.start();
  }
}

export default { Scheduler, ScheduledJobs };
