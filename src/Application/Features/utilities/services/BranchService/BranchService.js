import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';


class BranchService {
  static fetchBranchByPk(tenantRef, branchId) {
    return BasicQuerier.findByPk(tenantRef, 'Branch', branchId);
  }

  static bulkCreateBranches(listOfBranches) {
    return BasicQuerier.bulkCreate('Branch', listOfBranches);
  }

  static fetchBranches() {
    return BasicQuerier.findAll('Branch');
  }

  static findOrCreateSingleBranch(branch) {
    return models.Branch.findOrCreate({
      where: { solId: branch.solId },
      defaults: branch,
      raw: true
    });
  }
}

export default BranchService;
