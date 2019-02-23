import tenantsModels from '../../database/tenantsModels';

class ClaimService {
  static findOrCreateClaim(tenant, overtimeRequest) {
    const { Claims } = tenantsModels[tenant];

    return Claims.findOrCreate({
      where: {
        monthOfClaim: overtimeRequest.monthOfClaim,
        requester: overtimeRequest.requester
      },
      defaults: overtimeRequest,
      raw: true
    });
  }

  static updateClaim(tenant, claim, claimId) {
    const { Claims } = tenantsModels[tenant];

    return Claims.update(
      claim,
      { where: { id: claimId }, returning: true, raw: true }
    );
  }
}

export default ClaimService;
