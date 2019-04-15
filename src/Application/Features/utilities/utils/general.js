export const claimTypeRates = {
  weekday: 150,
  weekend: 800,
  shift: 800
};

export const authErrorCodes = {
  admin: 'ERRADMAUTH',
  staff: 'ERRSTFAUTH',
  lineManager: 'ERRLMRAUTH'
};

export const authRoleName = {
  admin: 'currentAdmin',
  staff: 'currentStaff',
  lineManager: 'lineManager'
};

export const exportDocHeaders = [
  'S/N', 'Staff ID', 'FirstName', 'LastName', 'MiddleName', 'Role', 'Branch', 'Sol ID',
  'Weekday', 'Weekend', 'Shift', 'Amount', 'Status', 'Month of Claim'
];

export const notificationActivities = {
  SupervisorApproved: 'Your claim was approved by your supervisor. It is awaiting your BSM\'s approval.',
  SupervisorDeclined: 'Your claim was declined by your supervisor.',
  BSMApproved: 'Your claim was approved by your BSM. It is now being processed by Admin.',
  BSMDeclined: 'Your claim was declined by your BSM.',
  adminProcessed: 'Your claim has been processed. It is now being processed for payment.',
  adminPaid: 'Your claim has been paid.'
};

export const staffIncludes = ['supervisor', 'BSM', 'company'];

export const tenantsInfo = {};
