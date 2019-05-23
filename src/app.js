import '@babel/polyfill';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'express-cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import subdomain from 'express-subdomain';
import Cron from './Application/Features/Cron';
import routes from './routes';
import TenantService from './Application/Features/utilities/services/TenantService';

const app = express();
TenantService.getTenantsList(); // initialise all tenants info for mailing/other operations

const setupApp = async () => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  if (process.env.NODE_ENV !== 'test') {
    app.use(cors({ allowedOrigins: await TenantService.mapForCors() }));
  }

  app.use(fileUpload({
    abortOnLimit: true,
    limits: { fileSize: 5000000 },
    responseOnLimit: 'File too large',
    useTempFiles: true,
    tempFileDir: `${__dirname}/uploads/`
  }));
  app.use(morgan('combined'));

  // Configuration to uploading to cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  // Add tenant's unique identifier property
  app.use((req, res, next) => {
    const [tenant] = req.headers.host.split('.overtime-api');
    req.tenantRef = tenant.toUpperCase();
    return next();
  });

  // Subdomain definitions
  app.use(subdomain('*.overtime-api', routes));
  app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

  // Schedule jobs
  Cron.Scheduler.scheduleJobs();
  Cron.Scheduler.scheduleStatsUpdateJob();
};

setupApp();

export default app;
