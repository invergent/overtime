import express from 'express';
import controller from './controller';
import InputValidator from '../../application/middlewares/InputValidator';

const router = express.Router();
const { signin } = controller;
const { checkProps, checkEntries } = InputValidator;

router.post('/signin', checkProps, checkEntries, signin);

router.get('/', (req, res) => res.status(200).json({ message: 'VLA boarded' }));

export default router;
