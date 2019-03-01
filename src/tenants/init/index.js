import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import Authenticator from '../../application/middlewares/Authenticator';

export default (tenant) => {
  const router = express.Router();
  const {
    forgotPassword, signin, authoriseLineManager, changePassword, updateBranch,
    confirmPasswordResetRequest, resetPassword, addOrChangeLineManager, createOvertimeClaim,
    pendingClaimsForlineManagers, approveClaim, declineClaim
  } = controller;
  const {
    checkProps, checkEntries, checkBranchId, checkStaffId, checkOvertimeProps,
    checkOvertimeValues
  } = InputValidator;
  const { authenticateStaff, authenticateLineManager, verifyLineManager } = Authenticator;

  const routerMethods = {
    signin: router.post('/signin', checkProps, checkEntries, signin),
    authoriseLineManager: router.get('/verify', verifyLineManager, authoriseLineManager),
    forgotPassword: router.post('/forgot-password', checkProps, checkStaffId, forgotPassword),
    confirmPassword: router.get('/confirm-reset-request', confirmPasswordResetRequest),
    createOvertimeClaim: router.post('/claim',
      authenticateStaff, checkOvertimeProps, checkOvertimeValues, createOvertimeClaim),
    pendingClaimsForlineManagers: router.get('/line-manager/claims/pending', authenticateLineManager, pendingClaimsForlineManagers),
    approveClaim: router.get('/line-manager/claims/pending/:claimId/approve', authenticateLineManager, approveClaim),
    declineClaim: router.get('/line-manager/claims/pending/:claimId/decline', authenticateLineManager, declineClaim),
    changePassword: router.post('/users/profile/change-password',
      authenticateStaff, checkProps, checkEntries, changePassword),
    addOrChangeLineManager: router.post('/users/profile/line-manager',
      authenticateStaff, checkProps, checkEntries, addOrChangeLineManager),
    updateBranch: router.put('/users/profile/branch', authenticateStaff, checkProps, checkBranchId, updateBranch),
    resetPassword: router.post('/users/profile/reset', authenticateStaff, checkEntries, resetPassword),
    started: ten => router.get('/a', (req, res) => res.status(200).json({ message: `${ten} boarded` })),
  };

  tenant.features.forEach((ft) => {
    if (ft === 'started') {
      return routerMethods[ft];
    }
    return routerMethods[ft];
  });

  return router;
};

// export default router;
