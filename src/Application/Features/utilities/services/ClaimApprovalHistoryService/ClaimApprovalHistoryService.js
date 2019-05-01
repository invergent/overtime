import models from '../../../../Database/models';

const { ClaimApprovalHistory } = models;

class ClaimApprovalHistoryService {
  static createApprovalHistory(claimId, lineManagerId) {
    return ClaimApprovalHistory.create({ claimId, lineManagerId });
  }

  static createApprovalHistoryOnCompletion(listOfClaims) {
    listOfClaims.forEach(claim => ClaimApprovalHistoryService.createApprovalHistory(claim.claimId));
  }
}

// Line manager Id as used here is the PK of the LineManagers model
export default ClaimApprovalHistoryService;
