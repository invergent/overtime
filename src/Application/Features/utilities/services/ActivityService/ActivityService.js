import models from '../../../../Database/models';

const { Activities } = models;

class ActivityService {
  static logActivity(activity, staffId) {
    return Activities.create({ activity, staffId });
  }

  static fetchActivities(staffId, limit) {
    const options = { where: { staffId }, order: [['createdAt', 'DESC']] };
    if (limit) options.limit = limit;
    return Activities.findAll(options);
  }
}

export default ActivityService;
