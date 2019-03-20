import tenantsModels from '../../database/tenantsModels';

class NotificationService {
  static createNotification(tenant, notification) {
    return tenantsModels[tenant].Notifications.create(notification);
  }
}

export default NotificationService;
