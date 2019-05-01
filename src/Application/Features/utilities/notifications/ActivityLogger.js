import ActivityService from '../services/ActivityService';

class ActivityLogger {
  static log(activity, staffId, data) {
    if (activity.includes('lineManager')) activity = ActivityLogger.refineChangeLineManagerLog(activity, data);
    if (activity.includes('{{branchName}}')) activity = ActivityLogger.refineChangeBranchLog(data);
    return ActivityService.logActivity(activity, staffId);
  }

  static logClaimActivity(data, activity) {
    return ActivityLogger.log(activity, data.staff.staffId);
  }

  static refineChangeLineManagerLog(activity, data) {
    const { firstname: fs, lastname: ls, lineManagerRole: lr } = data;
    if (activity.includes('Added')) return `Added ${fs} ${ls} as ${lr}`;
    return `Changed ${lr} to ${fs} ${ls}`;
  }

  static refineChangeBranchLog(data) {
    return `Updated branch to ${data.branchName}`;
  }
}

export default ActivityLogger;
