import {
  Op, where, cast, col
} from 'sequelize';
import models from '../../../../Database/models';
import Dates from '../Dates';

const {
  Claims, Staff, Branch, Roles
} = models;

class GenericHelpers {
  static createUpdatePayload(lineManagerRole, approvalType) {
    const payload = { status: 'Declined' };
    if (approvalType === 'decline') return payload;

    const status = lineManagerRole === 'Supervisor' ? 'Awaiting BSM' : 'Processing';
    payload.status = status;
    return payload;
  }

  static createQueryOptions(tenantRef, lineManager) {
    const { lineManagerId, lineManagerRole } = lineManager;
    const bsmOrSupervisorStaff = lineManagerRole === 'BSM' ? 'bsmStaff' : 'supervisorStaff';

    const claimsWhereOptions = { tenantRef, status: 'Awaiting supervisor' };
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

  static periodToFetch() {
    const { year, month } = Dates.getCurrentYearMonth();
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    return firstDayOfCurrentMonth;
  }

  static claimStatusFilter(statusType) {
    const statusFilter = {};
    if (statusType === 'pending') {
      statusFilter.status = where(cast(col('Claims.status'), 'TEXT'), { [Op.iLike]: '%Awaiting%' });
    }
    return statusFilter;
  }

  static adminFetchClaimOptions(tenantRef, statusType, period) {
    const options = {
      where: {
        tenantRef,
        createdAt: { [Op.gte]: GenericHelpers.periodToFetch(period) },
        ...GenericHelpers.claimStatusFilter(statusType)
      },
      include: [{
        model: Staff,
        include: [
          { model: Branch },
          { model: Roles, as: 'staffRole' }
        ]
      }],
      raw: true
    };
    return options;
  }

  static createColumnHeaderKeys(header) {
    const key = header.toLowerCase().replace(/\//g, '').replace(/ id/g, 'Id').replace(/ /g, '');
    return key;
  }

  static staffUpdateQueryOptions(tenantRef, staffId, field, updatePayload) {
    return {
      payload: { [field]: updatePayload },
      queryOptions: { where: { tenantRef, staffId }, returning: true }
    };
  }

  static fetchPendingClaimsOptions(tenantRef) {
    return {
      where: { tenantRef, ...GenericHelpers.claimStatusFilter('pending') },
      include: [Staff],
      plain: false,
      raw: true
    };
  }
}

export default GenericHelpers;
