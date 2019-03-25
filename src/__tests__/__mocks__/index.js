export const mockReq = {
  body: {
    staffId: 'someId',
    password: 'password',
    confirmPassword: 'password'
  },
  query: {
    hash: 'someHash'
  },
  currentStaff: { staffId: 'someId' },
  lineManager: {},
  params: { claimId: 'someClaim' },
  tenantRef: 'INIT'
};

export const mockStaff = {
  password: 'password'
};

export const models = {
  password: 'password'
};

export const mockLoginCredentials = {
  body: {
    staffId: 'someId',
    password: 'password'
  },
  tenant: 'INIT'
};

export const mockEmail = {
  to: 'to',
  from: 'from',
  subject: 'subject',
  html: 'html'
};
