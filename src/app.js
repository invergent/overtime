import '@babel/polyfill';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'express-cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import subdomain from 'express-subdomain';
import Cron from './Application/Features/Cron';
import routes from './routes';
import TenantService from './Application/Features/utilities/services/TenantService';

let originsUpdated;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({
  abortOnLimit: true,
  responseOnLimit: 'File too large',
  useTempFiles: true,
  tempFileDir: `${__dirname}/uploads/`
}));

// Configuration to uploading to cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

if (!originsUpdated) {
  TenantService.mapForCors().then((allowedOrigins) => {
    originsUpdated = true;
    app.use(cors({ allowedOrigins }));
  });

  TenantService.getTenantsList(); // initialise all tenants info for smooth operations
}


// Add tenant's unique identifier property
app.use((req, res, next) => {
  const [tenant] = req.headers.host.split('.overtime-api');
  req.tenantRef = tenant.toUpperCase();
  return next();
});

// Subdomain definitions
app.use(subdomain('*.overtime-api', routes));

// Schedule jobs
Cron.Scheduler.scheduleJobs();

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

export default app;
