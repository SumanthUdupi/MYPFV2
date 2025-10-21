
import { test, expect } from '@playwright/test';

test('Celestial Atelier Background', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForSelector('canvas');
  await expect(page.locator('canvas')).toBeVisible();
  await page.screenshot({ path: 'jules-scratch/verification/verification.png', full_page: true });
});
