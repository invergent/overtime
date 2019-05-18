import services from '../services';
import { notificationActivities } from '../utils/general';
import { eventNames } from '../utils/types';
import pusher from './pusher';
import helpers from '../helpers';

const { ClaimHelpers } = helpers;
const { NotificationService, ClaimService } = services;
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

  static notifyStaffCompleted(data) {
    return InAppNotifications.recordAndNotifyManyStaff(data);
  }

  static recordAndNotifyStaff(data, notificationSource) {
    const { staff, claimId } = data;
    const type = notificationSource.includes('Declined') ? 'Declined' : 'Approved';
    const message = notificationActivities[notificationSource];
    console.log(notificationSource);
    
    pusher.trigger(`${staff.staffId}`, notificationSource, { message });

    const notification = {
      activity: message, type, userId: staff.id, claimId
    };
    return NotificationService.createNotification(notification);
  }

  static async recordAndNotifyManyStaff(data) {
    const completedClaimsWithStaff = await ClaimService.fetchClaimsByTenantRef(data.tenantRef, 'Completed');
    const filteredListOfStaff = ClaimHelpers.filterCompletedClaims(completedClaimsWithStaff);

    return filteredListOfStaff.forEach((staff) => {
      const newData = { ...data, staff, claimId: staff.claimId };
      InAppNotifications.recordAndNotifyStaff(newData, 'adminProcessed');
    });
  }
}

export default InAppNotifications;
