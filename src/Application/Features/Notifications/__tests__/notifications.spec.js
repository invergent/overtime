import Notifications from '../Notifications';
import NotificationService from '../../utilities/services/NotificationService';
import { mockReq } from '../../../../__tests__/__mocks__';

describe('Notifications Unit DataTransferItemList', () => {
  it('should fail if an error occurs', async () => {
    jest.spyOn(NotificationService, 'fetchNotifications').mockRejectedValueOnce('err');
    const result = await Notifications.getNotifications(mockReq);

    expect(result).toHaveLength(2);
  });

  it('should fail if an error occurs while updating notifications', async () => {
    jest.spyOn(NotificationService, 'updateNotificationsAsViewedAndRead').mockRejectedValueOnce('err');
    const result = await Notifications.markAsViewedAndRead(mockReq);

    expect(result).toHaveLength(2);
  });

  it('should send a 500 response if notifications were not updated', async () => {
    jest.spyOn(NotificationService, 'updateNotificationsAsViewedAndRead').mockResolvedValue([false]);
    const result = await Notifications.markAsViewedAndRead(mockReq);

    expect(result[0]).toBe(500);
  });
});
