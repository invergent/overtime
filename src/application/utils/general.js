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

export const tenantList = {
  INIT: 'Invergent Technologies Limited'
};

export const exportDocHeaders = [
  'S/N', 'Staff ID', 'FirstName', 'LastName', 'MiddleName', 'Branch', 'Sol ID', 'Weekday',
  'Weekend', 'Shift', 'Amount', 'Status', 'Month of Claim'
];
