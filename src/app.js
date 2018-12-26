import express from 'express';

const app = express();

const port = parseInt(process.env.PORT, 10) || 7000;

app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

app.listen(port, () => console.log(`Live at ${port}`));
