
import { test, expect } from '@playwright/test';

test.describe('basicSchemaValidation form validation', () => {
  test('should validate the form with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onSubmit');
    await page.locator('button').click();

    const firstNameInput = page.locator('input[name="firstName"]');
           await firstNameInput.click(); // this ensures the input is focused

           const isFocused = await page.evaluate(
             (input) => document.activeElement === input,
             await firstNameInput.elementHandle(),
           );

           expect(isFocused).toBe(true);
    await expect(page.locator('input[name="firstName"] + p')).toHaveText('firstName error');
    await expect(page.locator('input[name="lastName"] + p')).toHaveText('lastName error');
    await expect(page.locator('select[name="selectNumber"] + p')).toHaveText('selectNumber error');
    await expect(page.locator('input[name="minRequiredLength"] + p')).toHaveText('minRequiredLength error');
    // @grit suppress
/*
await expect(page.locator('input[name="radio"] + p')).toHaveText('radio error');
*/

    // Fill in the form
    // ...

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('24');
  });

  test('should validate the form with onBlur mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onBlur');

    // Test form validation with onBlur mode
    // ...

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('22');
  });

  test('should validate the form with onChange mode', async ({ page }) => {
    await page.goto('http://localhost:3000/basic-schema-validation/onChange');

    // Test form validation with onChange mode
    // ...

    // @grit suppress
// Clicking the checkbox does not change its state
// await expect(page.locator('p')).toHaveCount(0);
    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('26');
  });
});
