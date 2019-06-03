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
}

export default SettingService;
