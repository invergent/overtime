import notify from './Notifier';
import { eventNames } from '../utils/types';
import EmailNotifications from './EmailNotifications';

notify.register(eventNames.PasswordReset, EmailNotifications.sendPasswordResetEmail);
notify.register(eventNames.NewClaim, EmailNotifications.NotifyLineManangersOfNewClaim);

export default notify;
