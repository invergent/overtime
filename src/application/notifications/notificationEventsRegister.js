import notify from './Notifier';
import { eventNames } from '../utils/types';
import EmailNotifications from './EmailNotifications';

notify.register(eventNames.PasswordReset, EmailNotifications.sendPasswordResetEmail);
notify.register(eventNames.NewClaim, EmailNotifications.NotifySupervisor);
notify.register(eventNames.SupervisorApproved, EmailNotifications.NotifyBSM);

export default notify;
