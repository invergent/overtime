import models from '../../../../Database/models';

const { Notifications } = models;

class NotificationService {
  static createNotification(notification) {
    return Notifications.create(notification);
  }

  static fetchNotifications(userId) {
    return Notifications.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  static updateNotificationsAsViewedAndRead(userId) {
    return Notifications.update({ read: true, viewed: true }, { where: { userId } });
  }
}

export default NotificationService;
