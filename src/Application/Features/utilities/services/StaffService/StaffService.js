import { Op } from 'sequelize';
import models from '../../../../Database/models';
import BasicQuerier from '../BasicQuerier';

const { Staff } = models;

class StaffService {
  static async updateStaffInfo(tenantRef, staffId, payload) {
    const queryOptions = { where: { tenantRef, staffId }, returning: true };
    const [updated] = await Staff.update(payload, queryOptions);
    return !!updated;
  }

  static fetchStaffByPk(tenantRef, staffPk, includes, order) {
    return BasicQuerier.findByPk(tenantRef, 'Staff', staffPk, includes, order);
  }

  static findStaffByStaffIdOrEmail(tenantRef, identifier, includes) {
    const searchColumn = identifier.includes('.com') ? 'email' : 'staffId';
    const options = { where: { tenantRef, [searchColumn]: identifier } };

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

  static findOrCreateSingleStaff(tenantRef, staff) {
    return Staff.findOrCreate({
      where: { tenantRef, staffId: staff.staffId },
      defaults: staff,
      raw: true
    });
  }

  static fetchStaff(tenantRef, attributes) {
    const options = { where: { tenantRef, staffId: { [Op.notLike]: 'ADMIN%' } }, attributes };
    return Staff.findAll(options);
  }
}

export default StaffService;
