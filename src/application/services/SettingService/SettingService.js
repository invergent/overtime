import models from '../../database/models';

const { Settings } = models;

class SettingService {
  static fetchAllSettings() {
    return Settings.findAll({ raw: true });
  }
}

export default SettingService;
