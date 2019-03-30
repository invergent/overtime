import helpers from '../utilities/helpers';
import services from '../utilities/services';

const { AdministrationHelpers } = helpers;
const { StaffService } = services;

class Administration {
  static async createStaff(req) {
    const { tenantRef, worksheet } = req;

    try {
      const staffArray = AdministrationHelpers.convertWorksheetToObjectsArray(tenantRef, worksheet);
      const results = await StaffService.bulkCreateStaff(staffArray);
      const createdStaff = results.map(result => result.dataValues);
      return [201, `${createdStaff.length} staff created successfully.`, createdStaff];
    } catch (e) {
      return [500, 'There was an error creating staff ERR500CRTSTF.', e];
    }
  }
}

export default Administration;
