import request from 'supertest';
import app from '../../src/server';
import { Account } from '../../src/models/account';

let server: any;

beforeAll(() => {
  server = app.listen();
});

afterAll(() => {
  server.close();
});

// Integration test complexity - Easy
// Test without Authentication
describe('GET /api-without-auth/account/:id without Authentication', () => {
  it('returns account information for a valid ID', async () => {
    const response = await request(app).get('/api-without-auth/account/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 1000,
      accountType: 'savings',
    });
  });

  it('throws error for non-existing account ID', async () => {
    const response = await request(app).get('/api-without-auth/account/9991a');
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual('Account not found.');
  });
});

// Integration test complexity - Moderate
// Test with Authentication
describe('GET /api/account:id with Authentication', () => {
  it('returns 401 if no authorization token is provided in header', async () => {
    const response = await request(app).get('/api/account/1');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Unauthorized!'
    });
  });

  it('returns account information for a valid ID with valid token', async () => {
    const response = await request(app)
      .get('/api/account/1')
      .set('Authorization', 'authenticated-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 1000,
      accountType: 'savings',
    });
  });
});

// Integration test complexity - Moderate
// Database transaction testing
describe('POST /api/account/update', () => {
  let originalBalance: number;

  beforeEach(async () => {
    // store the original balance before making any changes
    const account = await Account.findById('1');
    originalBalance = account.balance;
  });

  afterEach(async () => {
    // revert the balance afte each test
    await Account.updateBalance('1', originalBalance);
  });

  it('should update the balance of a valid Account', async () => {
    const response = await request(app)
      .post('/api/account/update')
      .set('Authorization', 'authenticated-token')
      .send({
        id: 1,
        balance: 990
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(990);

    const updatedAccount = await Account.findById('1');
    expect(updatedAccount.balance).toBe(990);
  });

  it('should return 404 error if account does not exist', async () => {
    const response = await request(app)
      .post('/api/account/update')
      .set('Authorization', 'authenticated-token')
      .send({
        id: 999,
        balance: 5000
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual('Error occured when updating Account balance!');
  });
});

// Integration test complexity - Advanced
// External API integration
describe('GET /api/account/:id with external Currency conversion API', () => {
  it('should get the balance in USD', async () => {
    const response = await request(app)
      .get('/api/account/1')
      .set('Authorization', 'authenticated-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 1000,
      accountType: 'savings',
    });
  });

  it('should get the balance in NPR', async () => {
    const response = await request(app)
      .get('/api/account/1?currency=NPR')
      .set('Authorization', 'authenticated-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 130000,
      accountType: 'savings',
    });
  });

  it('should get the balance in EUR', async () => {
    const response = await request(app)
      .get('/api/account/1?currency=EUR')
      .set('Authorization', 'authenticated-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 850,
      accountType: 'savings',
    });
  });

  it('should throw error when external API does not support the currency', async () => {
    const response = await request(app)
      .get('/api/account/1?currency=CAD')
      .set('Authorization', 'authenticated-token');
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual('Currency not supported.');
  });
});