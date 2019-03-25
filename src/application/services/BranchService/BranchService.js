import BasicQuerier from '../BasicQuerier';

class BranchService {
  static fetchBranchByPk(tenantRef, branchId) {
    return BasicQuerier.findByPk(tenantRef, 'Branch', branchId);
  }
}

export default BranchService;
