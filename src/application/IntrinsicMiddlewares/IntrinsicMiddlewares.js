import services from '../services';

const { ClaimService, StaffService } = services;

class IntrinsicMiddlewares {
  static async claimMiddleware(tenant, staffId, claimId) {
    const claim = await ClaimService.findClaimByPk(tenant, claimId);
    if (!claim) return [404, 'Claim does not exist.'];

    const staff = await StaffService.findStaffByStaffIdOrEmail(tenant, staffId, ['supervisor', 'BSM']);
    if (claim.requester !== staff.id) return [401, 'You do not have access to this claim.'];

    const statuses = ['Awaiting BSM', 'Awaiting supervisor'];
    if (!statuses.includes(claim.status)) {
      return [403, 'Operation failed. Only pending claims can be cancelled.'];
    }
    return [200, 'okay', staff];
  }
}

export default IntrinsicMiddlewares;
