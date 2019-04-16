export const templateNames = Object.freeze({
  Reset: 'Reset',
  NewClaimSupervisor: 'New Claim Supervisor',
  NewClaimBSM: 'New Claim BSM',
  NewClaimStaff: 'New Claim Staff',
  SupervisorApproved: 'Supervisor Approved',
  SupervisorDeclined: 'Supervisor Declined',
  BSMApproved: 'BSM Approved',
  BSMDeclined: 'BSM Declined',
  Cancelled: 'Claim Cancelled',
  Completed: 'Claim Completed',
  Reminder: 'Pending Claim Reminder'
});

export const roleNames = Object.freeze({
  Supervisor: 'Supervisor',
  Bsm: 'BSM'
});

export const eventNames = Object.freeze({
  ForgotPassword: 'ForgotPassword',
  NewClaim: 'NewClaim',
  SupervisorApproved: 'SupervisorApproved',
  SupervisorDeclined: 'SupervisorDeclined',
  BSMApproved: 'BSMApproved',
  BSMDeclined: 'BSMDeclined',
  Cancelled: 'Cancelled',
  Reminder: 'Reminder',
  LogActivity: 'LogActivity'
});

export const activityNames = Object.freeze({
  PasswordReset: 'Requested a PasswordReset.',
  ChangePassword: 'Updated password',
  ChangeBranch: 'Changed branch to {{branchName}}',
  NewClaim: 'Created a new claim',
  Cancelled: 'Cancelled claim'
});
