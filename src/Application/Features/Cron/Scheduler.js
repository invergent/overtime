import { CronJob } from 'cron';
import cronstrue from 'cronstrue';
import services from '../utilities/services';
import ClaimHelpers from '../utilities/helpers/ClaimHelpers';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';

const { ClaimService, SettingService } = services;

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
}

export default { Scheduler, ScheduledJobs };
