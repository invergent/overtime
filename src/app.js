import express from 'express';

const app = express();

app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

export default app;
