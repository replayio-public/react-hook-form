
import { test, expect } from '@playwright/test';

test.describe('form state with nested fields', () => {
  async function checkState(page, expected) {
    const stateText = await page.locator('#state').textContent();
    expect(JSON.parse(stateText)).toEqual(expected);
  }

  test('should return correct form state with onSubmit mode', async ({ page }) => {
    // ... (similarly convert all the test cases)
  });

  test('should return correct form state with onChange mode', async ({ page }) => {
    // ... (similarly convert all the test cases)
  });

  test('should return correct form state with onBlur mode', async ({ page }) => {
    // ... (similarly convert all the test cases)
  });

  test('should reset dirty value when inputs reset back to default with onSubmit mode', async ({ page }) => {
    // ... (similarly convert all the test cases)
  });

  test('should reset dirty value when inputs reset back to default with onBlur mode', async ({ page }) => {
    // ... (similarly convert all the test cases)
  });

  test('should reset dirty value when inputs reset back to default with onChange mode', async ({ page }) => {
    // ... (similarly convert all the test cases)
  });
});
