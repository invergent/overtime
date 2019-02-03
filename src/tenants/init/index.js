import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import authenticator from '../../application/middlewares/authenticator';


const router = express.Router();
const {
  forgotPassword, signin, changePassword, updateBranch,
  confirmPasswordResetRequest, resetPassword, addOrChangeLineManager, createOvertimeClaim
} = controller;
const {
  checkProps, checkEntries, checkBranchId, checkStaffId, checkOvertimeProps,
  checkOvertimeValues
} = InputValidator;

router.post('/signin', checkProps, checkEntries, signin);

router.post('/forgot-password', checkProps, checkStaffId, forgotPassword);
router.get('/confirm-reset-request', confirmPasswordResetRequest);

router.post('/overtime',
  authenticator, checkOvertimeProps, checkOvertimeValues, createOvertimeClaim);
// router.put(
//   '/overtime/:claimId', authenticator, validateParams, checkClaimsApprovalStatus,
//   checkOvertimeValues, processOvertimeClaim
// );


router.post('/users/profile/change-password',
  authenticator, checkProps, checkEntries, changePassword);
router.post('/users/profile/line-manager',
  authenticator, checkProps, checkEntries, addOrChangeLineManager);
router.put('/users/profile/branch', authenticator, checkProps, checkBranchId, updateBranch);
router.post('/users/profile/reset', authenticator, checkEntries, resetPassword);

router.get('/', (req, res) => res.status(200).json({ message: 'INIT boarded' }));

export default router;
