
import { test, expect } from '@playwright/test';

test.describe('ConditionalField', () => {
  test.skip('should reflect correct form state and data collection', async ({ page }) => {
    await page.goto('http://localhost:3000/conditionalField');
    const state = JSON.parse(await page.locator('#state').textContent());
    expect(state).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.selectOption('select[name="selectNumber"]', '1');
    await page.locator('input[name="firstName"]').fill('bill');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="lastName"]').blur();
    const state2 = JSON.parse(await page.locator('#state').textContent());
    expect(state2).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });
    await page.locator('button#submit').click();
    await expect(page.locator('#result').first()).toHaveText(
              '{"selectNumber":"1","firstName":"bill","lastName":"luo"}',
            );
    const state3 = JSON.parse(await page.locator('#state').textContent());
    expect(state3).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    const result1 = JSON.parse(await page.locator('#result').textContent());
    expect(result1).toEqual({
      selectNumber: '1',
      firstName: 'bill',
      lastName: 'luo',
    });

    await page.selectOption('select[name="selectNumber"]', '2');
    const state4 = JSON.parse(await page.locator('#state').textContent());
    expect(state4).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: false,
    });
    await page.locator('input[name="min"]').fill('10');
    await page.locator('input[name="max"]').fill('2');
    await page.locator('input[name="max"]').blur();
    const state5 = JSON.parse(await page.locator('#state').textContent());
    expect(state5).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    await page.locator('button#submit').click();
    const state6 = JSON.parse(await page.locator('#state').textContent());
    expect(state6).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    const result2 = JSON.parse(await page.locator('#result').textContent());
    expect(result2).toEqual({
      selectNumber: '2',
      firstName: 'bill',
      lastName: 'luo',
      min: '10',
      max: '2',
    });

    await page.selectOption('select[name="selectNumber"]', '3');
    const state7 = JSON.parse(await page.locator('#state').textContent());
    expect(state7).toEqual({
      dirty: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['selectNumber', 'firstName', 'lastName', 'min', 'max'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await page.locator('input[name="notRequired"]').fill('test');
    await page.locator('input[name="notRequired"]').blur();
    const state8 = JSON.parse(await page.locator('#state').textContent());
    expect(state8).toEqual({
      dirty: [
        'selectNumber',
        'firstName',
        'lastName',
        'min',
        'max',
        'notRequired',
      ],
      isSubmitted: true,
      submitCount: 2,
      touched: [
        'selectNumber',
        'firstName',
        'lastName',
        'min',
        'max',
        'notRequired',
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });

    await page.locator('button#submit').click();
    const result3 = JSON.parse(await page.locator('#result').textContent());
    expect(result3).toEqual({
      selectNumber: '3',
      firstName: 'bill',
      lastName: 'luo',
      min: '10',
      max: '2',
      notRequired: 'test',
    });

    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('30');
  });
});
