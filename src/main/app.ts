import express from 'express';
import { authRoutes } from '@/interface/routes/auth.routes';
import { pollRoutes } from '@/interface/routes/poll.routes';



const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});


app.use('/auth', authRoutes);
app.use('/polls', pollRoutes);

export { app };