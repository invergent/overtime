import { Op } from 'sequelize';
import tenantsModels from '../../database/tenantsModels';

class GenericHelpers {
  static createUpdatePayload(lineManagerRole, approvalType) {
    const payload = { status: 'Declined' };
    if (approvalType === 'decline') return payload;

    const status = lineManagerRole === 'Supervisor' ? 'Awaiting BSM' : 'Processing';
    payload.status = status;
    return payload;
  }

  static createQueryOptions(tenant, lineManager) {
    const { Claims, Staff } = tenantsModels[tenant];
    const { lineManagerId, lineManagerRole } = lineManager;
    const bsmOrSupervisorStaff = lineManagerRole === 'BSM' ? 'bsmStaff' : 'supervisorStaff';

    const claimsWhereOptions = { status: 'Awaiting supervisor' };
    if (lineManagerRole === 'BSM') claimsWhereOptions.status = 'Awaiting BSM';

    const options = {
      where: { lineManagerId },
      include: [{
        model: Staff,
        as: bsmOrSupervisorStaff,
        include: [{
          model: Claims,
          where: claimsWhereOptions
        }]
      }],
      plain: false,
      raw: true
    };

    return options;
  }

  static adminFetchClaimOptions(tenant, period) {
    const { Branch, Staff } = tenantsModels[tenant];
    const options = {
      where: {
        createdAt: { [Op.gte]: period }
      },
      include: [{
        model: Staff,
        include: [{
          model: Branch
        }]
      }],
      raw: true
    };

    return options;
  }

  static createColumnHeaderKeys(header) {
    const key = header.toLowerCase().replace(/\//g, '').replace(/ id/g, 'Id').replace(/ /g, '');
    return key;
  }
}

export default GenericHelpers;
