import tenantsModels from '../../database/tenantsModels';

class BranchService {
  static fetchBranchByPk(tenant, branchId) {
    const { Branch } = tenantsModels[tenant];
    return Branch.findByPk(branchId, { raw: true });
  }
}

export default BranchService;
