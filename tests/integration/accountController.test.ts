import request from 'supertest';
import app from '../../src/server';

let server: any;

beforeAll(() => {
  server = app.listen();
});

afterAll(() => {
  server.close();
});

// Integration test complexity - Easy
// Test without Authentication
describe('GET /api-without-auth/account:id without Authentication', () => {
  it('returns account information for a valid ID', async () => {
    const response = await request(app).get('/api-without-auth/account/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 1000,
      accountType: 'savings',
    });
  });

  it('returns empty object for non-existing account ID', async () => {
    const response = await request(app).get('/api-without-auth/account/9991a');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});

// Integration test complexity - Moderate
// Test with Authentication
describe('GET /api-with-auth/account:id with Authentication', () => {
  it('returns 401 if no authorization token is provided in header', async () => {
    const response = await request(app).get('/api-with-auth/account/1');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'Unauthorized!'
    });
  });

  it('returns account information for a valid ID with valid token', async () => {
    const response = await request(app)
      .get('/api-with-auth/account/1')
      .set('Authorization', 'authenticated-token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: '1',
      balance: 1000,
      accountType: 'savings',
    });
  });
});