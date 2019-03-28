import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { Settings } = models;

class SettingService {
  static fetchAllSettings() {
    return Settings.findAll({ raw: true });
  }

  static updateSettings(tenantRef, updatePayload) {
    return BasicQuerier.update(tenantRef, 'Settings', updatePayload);
  }
}

export default SettingService;
