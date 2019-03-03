import tenantsModels from '../../database/tenantsModels';
import BasicQuerier from '../BasicQuerier';

class StaffService {
  static async updatePassword(tenant, staffId, password) {
    const { Staff } = tenantsModels[tenant];
    const [updated] = await Staff.update(
      { password }, { where: { staffId }, returning: true }
    );
    return !!updated;
  }

  static fetchStaffByPk(tenant, staffPk, includes) {
    return BasicQuerier.findByPk(tenant, 'Staff', staffPk, includes);
  }

  static findStaffByStaffId(tenant, staffId, includes) {
    const { Staff } = tenantsModels[tenant];
    const options = { where: { staffId }, raw: true };

    if (includes && Array.isArray(includes)) {
      options.include = includes;
    }

    return Staff.findOne(options);
  }

  static updateStaffsLineManager(tenant, data) {
    const { Staff } = tenantsModels[tenant];
    const { id: lineManagerId, lineManagerIdColumn, staffId } = data;
    return Staff.update({ [lineManagerIdColumn]: lineManagerId }, { where: { staffId } });
  }

  static updateStaffsBranch(tenant, staffId, branchId) {
    const { Staff } = tenantsModels[tenant];
    return Staff.update({ branchId }, { where: { staffId }, returning: true });
  }
}

export default StaffService;
