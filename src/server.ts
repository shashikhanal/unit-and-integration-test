import express, { Request, Response } from 'express';
import accountController from './controllers/accountController';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
// middleware to parse incoming request bodies
app.use(express.json());

// mount the routes
app.use('/api', authMiddleware, accountController);

// start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
  });
}

export default app;