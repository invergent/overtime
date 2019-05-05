import models from '../../../../Database/models';

const { ClaimApprovalHistory } = models;

class ClaimApprovalHistoryService {
  static createApprovalHistory(approvalType, claimId, lineManagerId) {
    return ClaimApprovalHistory.create({ approvalType, claimId, lineManagerId });
  }

  static createApprovalHistoryOnCompletion(listOfClaims) {
    listOfClaims.forEach(claim => ClaimApprovalHistoryService.createApprovalHistory('completed', claim.claimId));
  }
}

// Line manager Id as used here is the PK of the LineManagers model
export default ClaimApprovalHistoryService;
