import '@babel/polyfill';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import subdomain from 'express-subdomain';
import vlaRouter from './tenants/vla';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Subdomain definitions
app.use(subdomain('vla', vlaRouter));

app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

export default app;
