import path from 'path';
import dotenv from 'dotenv';
import app from './app';

dotenv.config({ path: path.join(__dirname, '.env') });

const port = parseInt(process.env.PORT, 10) || 7000;

app.listen(port, () => console.log(`Live at ${port}`));
