import helpers from '../helpers';
import tenantsModels from '../database/tenantsModels';

const { instrinsicMiddlewareHelpers } = helpers;
const {
  claimExists, claimHasBeenApproved, checkThatUserCanUpdateThisClaim
} = instrinsicMiddlewareHelpers;

export default async (claimId, tenant, currentStaff) => {
  const { Claims, Staff } = tenantsModels[tenant];

  const claim = await claimExists(claimId, Claims);
  if (!claim) return [404, 'Claim does not exist.'];

  const userCanUpdateThisClaim = await checkThatUserCanUpdateThisClaim(claim, Staff, currentStaff);
  if (!userCanUpdateThisClaim) return [403, 'You do not have access to this claim.'];

  const claimsBeenApproved = claimHasBeenApproved(claim);
  if (claimsBeenApproved) {
    return [403, 'Claim has already been approved and cannot be edited.'];
  }
  return [200, 'okay'];
};
