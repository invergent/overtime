import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { Staff } = models;

class StaffService {
  static async updateStaffInfo(tenantRef, staffId, payload) {
    const queryOptions = { where: { tenantRef, staffId }, returning: true };
    const [updated] = await Staff.update(payload, queryOptions);
    return !!updated;
  }

  static fetchStaffByPk(tenantRef, staffPk, includes) {
    return BasicQuerier.findByPk(tenantRef, 'Staff', staffPk, includes);
  }

  static findStaffByStaffIdOrEmail(tenantRef, identifier, includes) {
    const searchColumn = identifier.includes('.com') ? 'email' : 'staffId';
    const options = { where: { tenantRef, [searchColumn]: identifier }, raw: true };

    if (includes && Array.isArray(includes)) options.include = includes;

    return Staff.findOne(options);
  }

  static updateStaffsLineManager(tenantRef, data) {
    const { id: lineManagerId, lineManagerIdColumn, staffId } = data;
    return Staff.update(
      { [lineManagerIdColumn]: lineManagerId }, { where: { tenantRef, staffId } }
    );
  }

  static bulkCreateStaff(listOfStaff) {
    return BasicQuerier.bulkCreate('Staff', listOfStaff);
  }
}

export default StaffService;
