import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/dogService', () => ({
  getRandomDogImage: vi.fn(),
}));

import { getRandomDogImage } from '../services/dogService';
import { getDogImage } from '../controllers/dogController';

describe('dogController.getDogImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Test 3 (positive): returns JSON with success:true and mocked service data', async () => {
    const mockedServiceData = {
      imageUrl: 'https://example.com/dog.jpg',
      status: 'success',
    };

    (getRandomDogImage as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockedServiceData
    );

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    await getDogImage({} as any, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceData,
    });
  });
});