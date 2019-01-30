import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import authenticator from '../../application/middlewares/authenticator';


const router = express.Router();
const {
  forgotPassword, signin, changePassword, updateBranch,
  confirmPasswordResetRequest, resetPassword, addOrChangeSupervisor, submitOvertimeRequest
} = controller;
const {
  checkProps, checkEntries, checkBranchId, checkStaffId, checkOvertimeProps,
  checkOvertimeValues
} = InputValidator;

router.post('/signin', checkProps, checkEntries, signin);

router.post('/forgot-password', checkProps, checkStaffId, forgotPassword);
router.get('/confirm-reset-request', confirmPasswordResetRequest);

router.post('/overtime',
  authenticator, checkOvertimeProps, checkOvertimeValues, submitOvertimeRequest);


router.post('/users/profile/change-password',
  authenticator, checkProps, checkEntries, changePassword);
router.post('/users/profile/supervisor',
  authenticator, checkProps, checkEntries, addOrChangeSupervisor);
router.put('/users/profile/branch', authenticator, checkProps, checkBranchId, updateBranch);
router.post('/users/profile/reset', authenticator, checkEntries, resetPassword);

router.get('/', (req, res) => res.status(200).json({ message: 'VLA boarded' }));

export default router;
