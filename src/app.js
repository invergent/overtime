import '@babel/polyfill';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import subdomain from 'express-subdomain';
import initRouter from './tenants/init';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Subdomain definitions
app.use(subdomain('init.overtime-api', initRouter));

app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

export default app;
