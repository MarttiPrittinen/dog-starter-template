import { test, expect } from '@playwright/test';

const URL = 'http://localhost:5173'; 

test.describe('Dog Application E2E Tests', () => {

  // Test 3: Positive E2E - Image loaded on page load
  test('should verify dog image is retrieved successfully when page is loaded', async ({ page }) => {
    const responsePromise = page.waitForResponse('**/api/dogs/random');
    await page.goto(URL);
    await responsePromise;

    const dogImage = page.locator('img'); 
    const src = await dogImage.getAttribute('src');

    expect(src).toBeTruthy();
    expect(src?.startsWith('https://')).toBe(true);
  });

  // Test 4: Positive E2E - Image loaded on button click
  test('should verify dog image is retrieved successfully when button is clicked', async ({ page }) => {
    await page.goto(URL);
    
    const responsePromise = page.waitForResponse('**/api/dogs/random');
    
    await page.getByRole('button').first().click(); 
    await responsePromise;

    const dogImage = page.locator('img');
    const src = await dogImage.getAttribute('src');

    expect(src).toBeTruthy();
    expect(src?.startsWith('https://')).toBe(true);
  });

  // Test 5: Negative E2E - API call fails
  test('should verify correct behavior when API call fails', async ({ page }) => {

    await page.route('**/api/dogs/random', route => route.abort());
    
    await page.goto(URL);

    const errorElement = page.locator('text=/error/i');
    
    await expect(errorElement).toBeVisible();
  });
});