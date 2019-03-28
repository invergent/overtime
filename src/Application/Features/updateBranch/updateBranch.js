import services from '../utilities/services';

const { StaffService, BranchService } = services;

export default async (req) => {
  const { currentStaff: { staffId }, body: { branchId }, tenantRef } = req;

  try {
    const branch = await BranchService.fetchBranchByPk(tenantRef, branchId);

    if (!branch) return [404, 'Branch does not exist.'];

    await StaffService.updateStaffInfo(tenantRef, staffId, 'branchId', branchId);
    return [200, 'Branch updated successfully.', branch];
  } catch (e) {
    return [500, 'An error occured ERR500CNGBRH'];
  }
};
