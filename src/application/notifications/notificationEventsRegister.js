import notify from './Notifier';
import types from '../utils/types';
import EmailNotifications from './EmailNotifications';

notify.register(types.NewClaim, EmailNotifications.sendPasswordResetEmail);

export default notify;
