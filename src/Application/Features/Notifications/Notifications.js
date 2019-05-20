import NotificationService from '../utilities/services/NotificationService';

class Notifications {
  static async getNotifications(req) {
    const { currentStaff, currentAdmin } = req;
    const currentUser = currentStaff || currentAdmin;
    try {
      const notifications = await NotificationService.fetchNotifications(currentUser.id);
      return [200, 'Request successful!', notifications];
    } catch (e) {
      return [500, 'An error occurred ERR500NOTIFS'];
    }
  }

  static async markAsViewedAndRead(req) {
    const { currentStaff: { id } } = req;

    try {
      const [updated] = await NotificationService.updateNotificationsAsViewedAndRead(id);
      return [updated ? 200 : 500, `Request ${updated ? '' : 'un'}successful!`];
    } catch (e) {
      return [500, 'An error occurred ERR500NOTVAR'];
    }
  }
}

export default Notifications;
