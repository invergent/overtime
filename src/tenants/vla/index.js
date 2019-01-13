import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import authenticator from '../../application/middlewares/authenticator';


const router = express.Router();
const {
  signin, addOrChangeSupervisor, updateBranch, forgotPassword, confirmPasswordResetRequest,
  resetPassword
} = controller;
const {
  checkProps, checkEntries, checkBranchId, checkStaffId
} = InputValidator;

router.post('/signin', checkProps, checkEntries, signin);
router.post('/supervisor', authenticator, checkProps, checkEntries, addOrChangeSupervisor);
router.put('/branch', authenticator, checkProps, checkBranchId, updateBranch);
router.post('/forgotPassword', checkProps, checkStaffId, forgotPassword);
router.get('/confirm-reset-request', confirmPasswordResetRequest);
router.post('/reset', authenticator, checkEntries, resetPassword);

router.get('/', (req, res) => res.status(200).json({ message: 'VLA boarded' }));

export default router;
