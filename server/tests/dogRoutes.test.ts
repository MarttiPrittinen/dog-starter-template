import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn(),
}));

import { getDogImage } from '../controllers/dogController';
import dogRoutes from '../routes/dogRoutes';

describe('dogRoutes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Test 4 (positive): GET /api/dogs/random returns 200 and success true and contains mocked imageUrl', async () => {
    const mockUrl = 'https://mocked.example/dog.png';

    (getDogImage as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      async (_req: any, res: any) => {
        return res.status(200).json({
          success: true,
          data: { imageUrl: mockUrl, status: 'success' },
        });
      }
    );

    const app = express();
    app.use('/api/dogs', dogRoutes);

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain(mockUrl);
  });

  it('Test 5 (negative): GET /api/dogs/random returns 500 and error is returned', async () => {
    (getDogImage as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      async (_req: any, res: any) => {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch dog image: Network error',
        });
      }
    );

    const app = express();
    app.use('/api/dogs', dogRoutes);

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Failed to fetch dog image: Network error');
  });
});