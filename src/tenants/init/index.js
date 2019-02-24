import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import Authenticator from '../../application/middlewares/Authenticator';


const router = express.Router();
const {
  forgotPassword, changePassword, updateBranch,
  confirmPasswordResetRequest, resetPassword, addOrChangeLineManager, createOvertimeClaim,
  updateOvertimeClaim, pendingClaimsForlineManagers
} = controller;
const {
  checkProps, checkEntries, checkBranchId, checkStaffId, checkOvertimeProps,
  checkOvertimeValues, checkParams
} = InputValidator;
const { staff: staffAuthenticator, lineManager: lineManagerAuthenticator } = Authenticator;

router.post('/signin', checkProps, checkEntries, controller.signin);

router.post('/forgot-password', checkProps, checkStaffId, forgotPassword);
router.get('/confirm-reset-request', confirmPasswordResetRequest);

router.post('/claim',
  staffAuthenticator, checkOvertimeProps, checkOvertimeValues, createOvertimeClaim);
router.put(
  '/claim/:claimId', staffAuthenticator, checkParams, checkOvertimeProps, checkOvertimeValues,
  updateOvertimeClaim
);

router.get('/line-manager/claims/pending', lineManagerAuthenticator, pendingClaimsForlineManagers);

router.post('/users/profile/change-password',
  staffAuthenticator, checkProps, checkEntries, changePassword);
router.post('/users/profile/line-manager',
  staffAuthenticator, checkProps, checkEntries, addOrChangeLineManager);
router.put('/users/profile/branch', staffAuthenticator, checkProps, checkBranchId, updateBranch);
router.post('/users/profile/reset', staffAuthenticator, checkEntries, resetPassword);

router.get('/', (req, res) => res.status(200).json({ message: 'INIT boarded' }));

export default router;
