export const formProperties = {
  signin: {
    staffId: 'staffId',
    password: 'password'
  },
  login: {
    email: 'email',
    password: 'password'
  },
  lineManager: {
    lineManagerRole: 'lineManagerRole',
    lineManagerId: 'lineManagerId',
    firstname: 'firstname',
    lastname: 'lastname',
    designation: 'designation',
    email: 'email'
  },
  branch: {
    branchId: 'branchId'
  },
  forgotPassword: {
    staffId: 'staffId'
  },
  reset: {
    password: 'password',
    confirmPassword: 'confirmPassword'
  },
  changePassword: {
    currentPassword: 'currentPassword',
    newPassword: 'newPassword',
    confirmPassword: 'confirmPassword'
  },
  rpcOvertimeRequest: {
    weekday: 'weekday',
    weekend: 'weekend',
    atm: 'atm'
  },
  emailSchedule: {
    emailSchedule: 'emailSchedule'
  },
  staff: {
    excelDoc: 'excelDoc'
  }
};

export const staffIdRegex = /^[T][N][0-9]{6}$/;
export const emailRegex = /\S+@\S+\.\S+/;
