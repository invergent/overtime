import '@babel/polyfill';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'express-cors';
import fileUpload from 'express-fileupload';
import subdomain from 'express-subdomain';
import Cron from './Application/Features/Cron';
import routes from './routes';

const app = express();
const allowedOrigins = [
  'localhost:8000',
  'localhost:4200',
  'overtime.invergent-technologies.com'
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors({ allowedOrigins }));

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
