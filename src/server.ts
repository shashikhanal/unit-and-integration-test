import express, { Request, Response } from 'express';
import accountController from './controllers/accountController';

const app = express();
// middleware to parse incoming request bodies
app.use(express.json());

// mount the routes
app.use('/api', accountController);

app.listen(3000, () => {
  console.log('Server is running on port: 3000...');
});