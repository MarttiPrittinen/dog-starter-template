import { describe, it, expect } from 'vitest';
import request from 'supertest';

const BASE_URL = 'http://localhost:5000'; 

describe('Dog API Tests', () => {

  // Test 1: Positive API test
  it('should return a random dog image with correct structure', async () => {
    const response = await request(BASE_URL).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('imageUrl');
    expect(typeof response.body.data.imageUrl).toBe('string');
  });

  // Test 2: Negative API test for invalid route
  it('should return 404 and correct error message for invalid route', async () => {
    const response = await request(BASE_URL).get('/api/dogs/invalid');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Route not found');
  });
});