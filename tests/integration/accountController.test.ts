import request from 'supertest';
import app from '../../src/server';

let server: any;

beforeAll(() => {
  server = app.listen();
});

afterAll(() => {
  server.close();
});

describe('GET /api/account:id', () => {
  it('returns account information for a valid ID', async () => {
    const response = await request(app).get('/api/account/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 1000,
      accountType: 'savings',
    });
  });
});
