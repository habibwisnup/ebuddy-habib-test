import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  console.log("GET / triggered");
  res.send('API is running!');
});

app.use('/api/user', userRoutes);

export default app;