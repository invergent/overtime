import notify from './Notifier';
import { eventNames } from '../utils/types';
import EmailNotifications from './EmailNotifications';
import InAppNotifications from './InAppNotifications';

notify.register(eventNames.PasswordReset, EmailNotifications.sendPasswordResetEmail);

notify.register(eventNames.NewClaim, EmailNotifications.notifySupervisorOfNewClaim);
notify.register(eventNames.NewClaim, EmailNotifications.notifyStaffOfClaimSubmission);

notify.register(eventNames.SupervisorApproved, EmailNotifications.notifyBSMSupervisorApproved);
notify.register(eventNames.SupervisorApproved, EmailNotifications.notifyStaffSupervisorApproved);
notify.register(eventNames.SupervisorApproved, InAppNotifications.notifyStaffSupervisorApproved);

notify.register(eventNames.BSMApproved, EmailNotifications.notifyStaffBSMApproved);
notify.register(eventNames.BSMApproved, InAppNotifications.notifyStaffBSMApproved);
// notify.register(eventNames.BSMApproved, EmailNotifications.notifyAdminOfApprovedClaim);

notify.register(eventNames.SupervisorDeclined, EmailNotifications.notifyStaffSupervisorDeclined);
notify.register(eventNames.BSMDeclined, EmailNotifications.notifyStaffBSMDeclined);
notify.register(eventNames.SupervisorDeclined, InAppNotifications.notifyStaffSupervisorDeclined);
notify.register(eventNames.BSMDeclined, InAppNotifications.notifyStaffBSMDeclined);

notify.register(eventNames.Cancelled, EmailNotifications.notifyStaffCancelled);
// notify.register(eventNames.Completed, EmailNotifications.notifyStaffCompleted);
// notify.register(eventNames.Completed, InAppNotifications.notifyStaffCompleted);

export default notify;
