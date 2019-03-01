import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import Authenticator from '../../application/middlewares/Authenticator';

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

router.post('/signin', checkProps, checkEntries, signin);
router.get('/verify', verifyLineManager, authoriseLineManager);

router.post('/forgot-password', checkProps, checkStaffId, forgotPassword);
router.get('/confirm-reset-request', confirmPasswordResetRequest);

router.post('/claim',
  authenticateStaff, checkOvertimeProps, checkOvertimeValues, createOvertimeClaim);

router.get('/line-manager/claims/pending', authenticateLineManager, pendingClaimsForlineManagers);
router.get('/line-manager/claims/pending/:claimId/approve', authenticateLineManager, approveClaim);
router.get('/line-manager/claims/pending/:claimId/decline', authenticateLineManager, declineClaim);

router.post('/users/profile/change-password',
  authenticateStaff, checkProps, checkEntries, changePassword);
router.post('/users/profile/line-manager',
  authenticateStaff, checkProps, checkEntries, addOrChangeLineManager);
router.put('/users/profile/branch', authenticateStaff, checkProps, checkBranchId, updateBranch);
router.post('/users/profile/reset', authenticateStaff, checkEntries, resetPassword);

router.get('/', (req, res) => res.status(200).json({ message: 'INIT boarded' }));

export default router;
