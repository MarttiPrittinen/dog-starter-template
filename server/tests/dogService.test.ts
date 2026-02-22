import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService.getRandomDogImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Test 1 (positive): returns imageUrl and success, and calls fetch once', async () => {
    const mockedApiResponse = {
      message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
      status: 'success',
    };

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockedApiResponse,
      } as any);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockedApiResponse.message);
    expect(result.status).toBe('success');
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('Test 2 (negative): rejects when API returns ok:false (500) and throws exact error message', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as any);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});