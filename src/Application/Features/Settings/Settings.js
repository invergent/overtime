import services from '../utilities/services';
import Cron from '../Cron';

const { SettingService } = services;

class Settings {
  static async updateEmailSchedule(req) {
    const { body, tenantRef } = req;
    let newCronTime;

    try {
      const [updated, settings] = await SettingService.updateSettings(tenantRef, body);
      if (updated) {
        newCronTime = Cron.Scheduler.updateCronJob(tenantRef, settings[0].emailSchedule);
      }
      return [
        updated ? 200 : 500,
        updated ? `Success! Pending claim reminders would now be sent ${newCronTime}.` : 'Cron Time was not updated.',
        settings
      ];
    } catch (e) {
      return [500, 'There was an error updating your email schedule ERR500UPDESH.'];
    }
  }
}

export default Settings;
