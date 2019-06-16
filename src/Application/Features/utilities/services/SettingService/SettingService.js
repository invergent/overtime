import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { Settings } = models;

class SettingService {
  static fetchAllSettings(tenantRef) {
    const options = { raw: true };
    if (tenantRef) options.where = { tenantRef };
    return Settings.findAll(options);
  }

  static updateSettings(tenantRef, updatePayload) {
    return BasicQuerier.update(tenantRef, 'Settings', updatePayload);
  }

  static async updateOvertimeWindow([tenantRef, scheduleType]) {
    const overtimeWindow = scheduleType.includes('Start') ? 'Open' : 'Close';
    return BasicQuerier.update(tenantRef, 'Settings', { overtimeWindow });
  }
}

export default SettingService;
