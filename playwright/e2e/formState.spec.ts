
import { test, expect } from '@playwright/test';

test.describe('form state', () => {
  async function checkState(page, expected) {
    const stateText = await page.locator('#state').textContent();
    expect(JSON.parse(stateText)).toEqual(expected);
  }

  test('should return correct form state with onSubmit mode', async ({ page }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');

    await checkState(page, {
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    // ... (rest of the test cases)
  });

  // ... (rest of the test.describe block)
});
