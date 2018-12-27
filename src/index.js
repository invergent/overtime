import app from './app';

const port = parseInt(process.env.PORT, 10) || 7000;

app.listen(port, () => console.log(`Live at ${port}`));
