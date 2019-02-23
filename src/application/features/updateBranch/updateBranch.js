import services from '../../services';

const { StaffService, BranchService } = services;

export default async (req) => {
  const { currentStaff: { staffId }, body: { branchId }, tenant } = req;

  try {
    const branch = await BranchService.fetchBranchByPk(tenant, branchId);

    if (!branch) return [404, 'Branch does not exist.'];

    const data = await StaffService.updateStaffsBranch(tenant, staffId, branchId);
    return [200, 'Branch updated successfully.', branch];
  } catch (e) {
    return [500, 'An error occured ERR500CNGBRH'];
  }
};
