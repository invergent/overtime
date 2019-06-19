import Settings from '../Settings';
import services from '../../utilities/services';
import { mockReq } from '../../../../__tests__/__mocks__';

const { SettingService } = services;

jest.mock('@sendgrid/mail');

describe('Settings Unit Test', () => {
  it('should send a fail message if cron time was not updated.', async () => {
    jest.spyOn(SettingService, 'updateSettings').mockResolvedValue([false, {}]);

    const result = await Settings.updateSchedules(mockReq);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(500);
    expect(result[1]).toEqual('Schedule was not updated.');
  });

  it('should send a 500 response if an error occurs.', async () => {
    jest.spyOn(SettingService, 'updateSettings').mockRejectedValue([false, {}]);

    const result = await Settings.updateSchedules(mockReq);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(500);
    expect(result[1]).toEqual('There was an error updating your schedule ERR500UPDSCH.');
  });
});
