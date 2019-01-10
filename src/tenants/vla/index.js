import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import authenticator from '../../application/middlewares/authenticator';

const router = express.Router();
const { signin, addOrChangeSupervisor, updateBranch } = controller;
const { checkProps, checkEntries, checkBranchId } = InputValidator;

router.post('/signin', checkProps, checkEntries, signin);
router.post('/supervisor', authenticator, checkProps, checkEntries, addOrChangeSupervisor);
router.put('/branch', authenticator, checkProps, checkBranchId, updateBranch);

router.get('/', (req, res) => res.status(200).json({ message: 'VLA boarded' }));

export default router;
