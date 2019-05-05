export const templateNames = Object.freeze({
  Reset: 'Reset Staff',
  NewClaimSupervisor: 'New Claim Supervisor',
  NewClaimBSM: 'New Claim BSM',
  NewClaimStaff: 'New Claim Staff',
  supervisorApproved: 'Supervisor Approved Staff',
  supervisorDeclined: 'Supervisor Declined Staff',
  BSMApproved: 'BSM Approved Staff',
  BSMDeclined: 'BSM Declined Staff',
  Cancelled: 'Claim Cancelled Staff',
  Completed: 'Claim Completed Staff',
  Reminder: 'Pending Claim Reminder Staff'
});

export const roleNames = Object.freeze({
  supervisor: 'supervisor',
  BSM: 'BSM'
});

export const eventNames = Object.freeze({
  ForgotPassword: 'ForgotPassword',
  NewClaim: 'NewClaim',
  supervisorApproved: 'supervisorApproved',
  supervisorDeclined: 'supervisorDeclined',
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
