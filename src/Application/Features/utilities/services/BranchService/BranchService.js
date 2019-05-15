import BasicQuerier from '../BasicQuerier';

class BranchService {
  static fetchBranchByPk(tenantRef, branchId) {
    return BasicQuerier.findByPk(tenantRef, 'Branch', branchId);
  }

  static bulkCreateBranches(listOfBranches) {
    return BasicQuerier.bulkCreate('Branch', listOfBranches);
  }

  static fetchBranches() {
    return BasicQuerier.findAll('Branch')
  }
}

export default BranchService;
