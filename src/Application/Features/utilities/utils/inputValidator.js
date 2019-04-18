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
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email'
  },
  branch: {
    branchId: 'branchId'
  },
  image: {
    image: 'image'
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
  },
  branches: {
    excelDoc: 'excelDoc'
  }
};

export const staffIdRegex = /^[T][N][0-9]{6}$/;
export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
export const solIdRegex = /^\d{4}$/;
