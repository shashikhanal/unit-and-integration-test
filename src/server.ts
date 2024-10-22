import express from 'express';
import bodyParser from 'body-parser';
import accountController from './controllers/accountController';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// middleware to parse incoming request bodies
app.use(express.json());

// mount the routes
// two separate endpoints just for demonstrating test complexity
app.use('/api-without-auth', accountController);
app.use('/api', authMiddleware, accountController);

// start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
  });
}

export default app;