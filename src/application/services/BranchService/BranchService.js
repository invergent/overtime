import BasicQuerier from '../BasicQuerier';

class BranchService {
  static fetchBranchByPk(tenant, branchId) {
    return BasicQuerier.findByPk(tenant, 'Branch', branchId);
  }
}

export default BranchService;
