import services from '../services';

const { ClaimService, StaffService } = services;

export default async (tenant, staffId, claimId) => {
  const claim = await ClaimService.findClaimByPk(tenant, claimId);
  if (!claim) return [404, 'Claim does not exist.'];

  const staff = await StaffService.findStaffByStaffId(tenant, staffId);
  if (claim.requester !== staff.id) return [403, 'You do not have access to this claim.'];

  const { approvalBySupervisor, approvalByBSM } = claim;
  if (approvalBySupervisor !== 'Pending' || approvalByBSM !== 'Pending') {
    return [403, 'Claim has already been approved/declined and cannot be edited.'];
  }
  return [200, 'okay'];
};
