import { test, expect } from '@playwright/test';

test.describe('form trigger', () => {
  test.skip('should trigger input validation', async ({ page }) => {
    await page.goto('http://localhost:3000/trigger-validation');

    await expect(page.locator('#testError')).toBeEmpty();
    await expect(page.locator('#test1Error')).toBeEmpty();
    await expect(page.locator('#test2Error')).toBeEmpty();

    await page.locator('#single').click();
    await expect(page.locator('#testError')).toHaveText('required');
    await page.locator('#single').click();

    await page.locator('#multiple').click();
    await expect(page.locator('#test1Error')).toHaveText('required');
    await expect(page.locator('#test2Error')).toHaveText('required');

    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('4');

    await page.locator('#multiple').click();
    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('5');
  });
});
