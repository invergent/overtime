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
  image: {
    image: 'image'
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
  schedules: {
    emailSchedule: 'emailSchedule',
    overtimeWindowStart: 'overtimeWindowStart',
    overtimeWindowEnd: 'overtimeWindowEnd',
    overtimeWindowIsActive: 'overtimeWindowIsActive'
  },
  staff: {
    excelDoc: 'excelDoc'
  },
  branch: {
    excelDoc: 'excelDoc'
  },
  single: {
    staffId: 'staffId',
    firstname: 'firstname',
    lastname: 'lastname',
    middlename: 'middlename',
    email: 'email',
    phone: 'phone'
  }
};

export const staffIdRegex = /^[Tt][Nn][0-9]{6}$/;
export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
export const solIdRegex = /^\d{4}$/;
export const phoneRegex = /^\d{11}$/;
export const numberRegex = /^\d$/;
