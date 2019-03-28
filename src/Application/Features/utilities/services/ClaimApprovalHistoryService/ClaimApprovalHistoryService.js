import models from '../../../../Database/models';

const { ClaimApprovalHistory } = models;

class ClaimApprovalHistoryService {
  static createApprovalHistory(tenantRef, claimId, lineManagerId) {
    return ClaimApprovalHistory.create(
      { tenantRef, claimId, lineManagerId }, { include: ['lineManager'] }
    );
  }
}

// Line manager Id as used here is the PK of the LineManagers model
export default ClaimApprovalHistoryService;
