import services from '../utilities/services';
import Cron from '../Cron';

const { SettingService } = services;

class Settings {
  static async updateSchedules(req) {
    const { body, tenantRef, path } = req;
    const scheduleType = body.emailSchedule ? 'emailSchedule' : 'overtimeWindowSchedule';
    const updateCron = !path.includes('request-window');

    try {
      const [updated, settings] = await SettingService.updateSettings(tenantRef, body);
      if (updated && updateCron) {
        Cron.Scheduler.updateCronJob(tenantRef, scheduleType, settings[0]);
      }
      return [
        updated ? 200 : 500,
        updated ? 'Update successful!' : 'Schedule was not updated.',
        settings
      ];
    } catch (e) {
      return [500, 'There was an error updating your schedule ERR500UPDSCH.'];
    }
  }
}

export default Settings;
