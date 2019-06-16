import services from '../utilities/services';
import Cron from '../Cron';

const { SettingService } = services;

class Settings {
  static async updateSchedules(req) {
    const { body, tenantRef } = req;
    const scheduleType = body.emailSchedule ? 'emailSchedule' : 'overtimeWindowSchedule';

    try {
      const [updated, settings] = await SettingService.updateSettings(tenantRef, body);
      if (updated) {
        Cron.Scheduler.updateCronJob(tenantRef, scheduleType, settings[0]);
      }
      return [
        updated ? 200 : 500,
        updated ? 'Update successful!' : 'Schedule was not updated.',
        settings
      ];
    } catch (e) {
      return [500, 'There was an error updating your email schedule ERR500UPDESH.'];
    }
  }
}

export default Settings;
