import services from '../../Features/utilities/services';

const { ClaimService, StaffService } = services;

class ClaimAccessControl {
  static async validateClaimAccess(req, res, next) {
    const { tenantRef, currentStaff: { staffId }, params: { claimId } } = req;
    const claim = await ClaimService.findClaimByPk(tenantRef, claimId);
    if (!claim) return res.status(404).json({ message: 'Claim does not exist.' });

    const staff = await StaffService.findStaffByStaffIdOrEmail(tenantRef, staffId, ['supervisor', 'BSM']);
    if (claim.requester !== staff.id) {
      return res.status(401).json({ message: 'You do not have access to this claim.' });
    }

    const statuses = ['Awaiting BSM', 'Awaiting supervisor'];
    if (!statuses.includes(claim.status)) {
      return res.status(403).json({
        message: 'Operation failed. Only pending claims can be cancelled.'
      });
    }
    req.staff = staff;
    return next();
  }
}

export default ClaimAccessControl;
