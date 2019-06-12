import {
  Op, where, cast, col
} from 'sequelize';
import models from '../../../../Database/models';
import Dates from '../Dates';

const { Claims, Staff } = models;

class GenericHelpers {
  static createUpdatePayload(lineManagerRole, approvalType) {
    const payload = { status: 'Declined' };
    if (approvalType === 'decline') return payload;

    const status = lineManagerRole === 'supervisor' ? 'Awaiting BSM' : 'Processing';
    payload.status = status;
    return payload;
  }

  static createLineManagerQueryOptions(tenantRef, lineManager) {
    const { id, lineManagerRole } = lineManager;
    const bsmOrSupervisorStaff = lineManagerRole === 'BSM' ? 'bsmStaff' : 'supervisorStaff';

    const claimsWhereOptions = { tenantRef, status: 'Awaiting supervisor' };
    if (lineManagerRole === 'BSM') claimsWhereOptions.status = 'Awaiting BSM';

    const options = {
      where: { id },
      include: [{
        model: Staff,
        as: bsmOrSupervisorStaff,
        include: [{
          model: Claims,
          where: claimsWhereOptions
        }]
      }]
    };

    return options;
  }

  static periodToFetch() {
    const { year, month } = Dates.getCurrentYearMonth();
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    return firstDayOfCurrentMonth;
  }

  static castStatusColumn(status) {
    const column = col('Claims.status');
    const colCast = cast(column, 'TEXT');
    const whereCast = where(colCast, { [Op.iLike]: `%${status}%` });
    return whereCast;
  }

  static notCancelledOrDeclined() {
    const column = col('Claims.status');
    const colCast = cast(column, 'TEXT');
    const whereCast = where(colCast, { [Op.like]: { [Op.any]: ['Completed', 'Processing', 'Awaiting%'] } });
    return whereCast;
  }

  static claimStatusFilter(statusType) {
    const statusFilter = {};
    if (statusType) statusFilter.status = GenericHelpers.castStatusColumn(statusType);
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
        include: ['branch', 'role']
      }],
      raw: true
    };
    return options;
  }

  static createColumnHeaderKeys(header) {
    const key = header
      .toLowerCase()
      .replace(/\//g, '')
      .replace(/ id/g, 'Id')
      .replace(/ /g, '')
      .replace(/monthofclaim/g, 'monthOfClaim');
    return key;
  }

  static fetchPendingClaimsOptions(tenantRef, statusType) {
    return {
      where: { tenantRef, ...GenericHelpers.claimStatusFilter(statusType) },
      include: [Staff],
      plain: false,
      raw: true
    };
  }

  static claimsInProcessingOptions(tenantRef) {
    const options = GenericHelpers.adminBulkSortQueryOptions(tenantRef, 'Processing');
    return options;
  }

  static fetchCompletedClaimsQueryOptions(tenantRef) {
    const options = GenericHelpers.adminBulkSortQueryOptions(tenantRef, 'Completed');
    options.include = [Staff];
    return options;
  }

  static adminBulkSortQueryOptions(tenantRef, statusType) {
    return {
      where: {
        tenantRef,
        createdAt: { [Op.gte]: GenericHelpers.periodToFetch() },
        ...GenericHelpers.claimStatusFilter(statusType)
      },
      plain: false,
      raw: true
    };
  }

  static staffPendingClaimOptions(tenantRef, staffId, statusType) {
    return {
      where: { tenantRef, ...GenericHelpers.claimStatusFilter(statusType) },
      include: [{ model: Staff, where: { staffId } }, 'approvalHistory']
    };
  }
}

export default GenericHelpers;
