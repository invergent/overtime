import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';
import authenticator from '../../application/middlewares/authenticator';

const router = express.Router();
const { signin, addOrChangeSupervisor } = controller;
const { checkProps, checkEntries } = InputValidator;

router.post('/signin', checkProps, checkEntries, signin);
router.post('/supervisor', authenticator, checkProps, checkEntries, addOrChangeSupervisor);

router.get('/', (req, res) => res.status(200).json({ message: 'VLA boarded' }));

export default router;
