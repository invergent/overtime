import services from '../services';
import { notificationActivities } from '../utils/general';
import { eventNames } from '../utils/types';
import pusher from './pusher';

const { NotificationService } = services;
const {
  supervisorApproved, supervisorDeclined, BSMApproved, BSMDeclined
} = eventNames;

class InAppNotifications {
  static notifyStaffSupervisorApproved(data) {
    return InAppNotifications.recordAndNotifyStaff(data, supervisorApproved);
  }

  static notifyStaffBSMApproved(data) {
    return InAppNotifications.recordAndNotifyStaff(data, BSMApproved);
  }

  static notifyStaffSupervisorDeclined(data) {
    return InAppNotifications.recordAndNotifyStaff(data, supervisorDeclined);
  }

  static notifyStaffBSMDeclined(data) {
    return InAppNotifications.recordAndNotifyStaff(data, BSMDeclined);
  }

  static recordAndNotifyStaff(data, notificationSource) {
    const { tenantRef, staff, claimId } = data;
    const message = notificationActivities[notificationSource];

    pusher.trigger(`${staff.staffId}`, notificationSource, { message });

    const notification = { activity: message, userId: staff.id, claimId };
    return NotificationService.createNotification(tenantRef, notification);
  }
}

export default InAppNotifications;
