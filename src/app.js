import '@babel/polyfill';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import subdomain from 'express-subdomain';
import initRouter from './tenants/init';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Add tenant's unique identifier property
app.use((req, res, next) => {
  const [tenant] = req.headers.host.split('.overtime-api');
  req.tenant = tenant.toUpperCase();
  return next();
});

// Subdomain definitions
app.use(subdomain('init.overtime-api', initRouter));

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

export default app;
