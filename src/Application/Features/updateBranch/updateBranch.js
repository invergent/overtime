import services from '../utilities/services';
import { eventNames, activityNames } from '../utilities/utils/types';
import notifications from '../utilities/notifications';

const { StaffService, BranchService } = services;

export default async (req) => {
  const { currentStaff: { staffId }, body: { branchId }, tenantRef } = req;

  try {
    const branch = await BranchService.fetchBranchByPk(tenantRef, branchId);

    if (!branch) return [404, 'Branch does not exist.'];

    await StaffService.updateStaffInfo(tenantRef, staffId, 'branchId', branchId);
    notifications.emit(eventNames.LogActivity, [activityNames.ChangeBranch, staffId, branch]);
    return [200, 'Branch updated successfully.', branch];
  } catch (e) {
    return [500, 'An error occured ERR500CNGBRH'];
  }
};
