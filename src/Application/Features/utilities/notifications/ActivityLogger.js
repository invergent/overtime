import ActivityService from '../services/ActivityService';
import { activityNames } from '../utils/types';

class ActivityLogger {
  static log(activity, staffId, data) {
    if (activity.includes('lineManager')) activity = ActivityLogger.refineChangeLineManagerLog(activity, data);
    if (activity.includes('{{branchName}}')) activity = ActivityLogger.refineChangeBranchLog(data);
    return ActivityService.logActivity(activity, staffId);
  }

  static logClaimActivity(data) {
    return ActivityLogger.log(activityNames.NewClaim, data.staff.staffId);
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
