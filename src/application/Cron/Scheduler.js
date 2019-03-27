import { CronJob } from 'cron';
import services from '../services';
import ClaimHelpers from '../helpers/ClaimHelpers';
import notifications from '../notifications';
import { eventNames } from '../utils/types';

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
      const job = new CronJob(emailSchedule, Scheduler.checkPendingClaims, [tenantRef]);
      job.start();

      // store jobs for future reference
      ScheduledJobs[tenantRef] = job;
    });
  }

  static async checkPendingClaims(tenantRef) {
    const pendingClaims = await ClaimService.fetchClaimsByTenantRef(tenantRef[0]);
    if (pendingClaims.length) {
      Scheduler.triggerEmailNotification(tenantRef[0], pendingClaims);
    }
  }

  static triggerEmailNotification(tenantRef, staffWithPendingClaim) {
    const filteredStaff = ClaimHelpers.filterReminderPendingClaims(staffWithPendingClaim);
    notifications.emit(eventNames.Reminder, [tenantRef, filteredStaff]);
  }
}

export default { Scheduler, ScheduledJobs };
