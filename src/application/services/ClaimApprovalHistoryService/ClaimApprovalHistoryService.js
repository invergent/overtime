import tenantsModels from '../../database/tenantsModels';

class ClaimApprovalHistoryService {
  static createApprovalHistory(tenant, claimId, lineManagerId) {
    const { ClaimApprovalHistory } = tenantsModels[tenant];
    return ClaimApprovalHistory.create({ claimId, lineManagerId }, { include: ['lineManager'] });
  }
}

// Line manager Id as used here is the PK of the LineManagers model
export default ClaimApprovalHistoryService;
