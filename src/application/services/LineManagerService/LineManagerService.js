import models from '../../database/models';

const { LineManagers } = models;

class LineManagerService {
  static findOrCreateLineManager(lineManagerDetails) {
    return LineManagers.findOrCreate({
      where: { email: lineManagerDetails.email },
      defaults: lineManagerDetails,
      raw: true
    });
  }
}

export default LineManagerService;
