import models from '../../../../Database/models';

const { LineManagers } = models;

class LineManagerService {
  static findOrCreateLineManager(lineManagerDetails) {
    const { email } = lineManagerDetails;
    return LineManagers.findOrCreate({
      where: { email },
      defaults: lineManagerDetails
    });
  }

  static fetchLineManagers() {
    return LineManagers.findAll();
  }
}

export default LineManagerService;
