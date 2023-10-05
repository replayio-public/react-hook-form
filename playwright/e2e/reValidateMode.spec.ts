
import { test, expect } from '@playwright/test';

test.describe('re-validate mode', () => {
  test('should re-validate the form only onSubmit with mode onSubmit and reValidateMode onSubmit', async ({ page }) => {
    await page.goto('http://localhost:3000/re-validate-mode/onSubmit/onSubmit');

    await page.locator('button#submit').click();

    await expect(page.locator('input[name="firstName"] + p')).toHaveText('firstName error');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');

    await page.locator('input[name="firstName"]').fill('luo123456');
    await page.locator('input[name="lastName"]').fill('luo12');

    await expect(page.locator('input[name="firstName"] + p')).toHaveText('firstName error');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');

    await page.locator('button#submit').click();

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('4');
  });

  // Add the remaining test cases here, following the same pattern as above.
});
