import { config } from 'dotenv';
import app from './app';

config();

const port = parseInt(process.env.PORT, 10) || 7000;

app.listen(port, () => console.log(`Live at ${port}`));
