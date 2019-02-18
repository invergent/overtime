class IntrinsicMiddlewareHelpers {
  static getStaffByPk(StaffModel, staffModelPk) {
    return StaffModel.findByPk(staffModelPk, { raw: true });
  }

  static claimExists(claimId, ClaimModel) {
    return ClaimModel.findByPk(claimId, { raw: true });
  }

  static async checkThatUserCanUpdateThisClaim(claim, StaffModel, currentStaffId) {
    const { requester } = claim;
    const staff = await IntrinsicMiddlewareHelpers.getStaffByPk(StaffModel, requester);
    if (staff.staffId !== currentStaffId) return false;
    return true;
  }

  static claimHasBeenApproved(claim) {
    const { approvedBySupervisor, approvedByBSM } = claim;
    if (!approvedBySupervisor && !approvedByBSM) return false;
    return true;
  }
}

export default IntrinsicMiddlewareHelpers;
