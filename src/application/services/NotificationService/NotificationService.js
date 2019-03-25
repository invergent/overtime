import models from '../../database/models';

const { Notifications } = models;

class NotificationService {
  static createNotification(tenantRef, notification) {
    return Notifications.create(notification);
  }
}

export default NotificationService;
