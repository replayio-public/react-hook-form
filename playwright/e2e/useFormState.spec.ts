
import { test, expect } from '@playwright/test';

test.describe('useFormState', () => {
  test('should subscribed to the form state without re-render the root', async ({ page }) => {
    await page.goto('http://localhost:3000/useFormState');
    await page.locator('button#submit').click();

    await page.locator('input[name="firstName"]').fill('billa');
    await page.locator('input[name="arrayItem.0.test1"]').fill('ab');
    await page.locator('input[name="nestItem.nest1"]').fill('ab');
    await page.locator('input[name="lastName"]').fill('luo123456');
    await page.locator('select[name="selectNumber"]').selectOption('1');
    await page.locator('input[name="pattern"]').fill('luo');
    await page.locator('input[name="min"]').fill('1');
    await page.locator('input[name="max"]').fill('21');
    await page.locator('input[name="minDate"]').fill('2019-07-30');
    await page.locator('input[name="maxDate"]').fill('2019-08-02');
    await page.locator('input[name="lastName"]').fill('luo');
    await page.locator('input[name="minLength"]').fill('b');
    await page.locator('input[name="minLength"]').blur();

    const expectedState1 = {
      isDirty: true,
      touched: [
        'nestItem',
        'firstName',
        'arrayItem',
        'lastName',
        'selectNumber',
        'pattern',
        'min',
        'max',
        'minDate',
        'maxDate',
        'minLength',
      ],
      dirty: [
        'firstName',
        'arrayItem',
        'nestItem',
        'lastName',
        'selectNumber',
        'pattern',
        'min',
        'max',
        'minDate',
        'maxDate',
        'minLength',
      ],
      isSubmitted: true,
      isSubmitSuccessful: false,
      submitCount: 0,
      isValid: false,
    };
    // @grit suppress
/*
expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState1);
*/

    await page.locator('input[name="pattern"]').fill('23');
    await page.locator('input[name="minLength"]').fill('bi');
    await page.locator('input[name="minRequiredLength"]').fill('bi');
    await page.locator('input[name="min"]').fill('11');
    await page.locator('input[name="max"]').fill('19');
    await page.locator('input[name="minDate"]').fill('2019-08-01');
    await page.locator('input[name="maxDate"]').fill('2019-08-01');

    const expectedState2 = {
      isDirty: true,
      touched: [
        'nestItem',
        'firstName',
        'arrayItem',
        'lastName',
        'selectNumber',
        'pattern',
        'min',
        'max',
        'minDate',
        'maxDate',
        'minLength',
        'minRequiredLength',
      ],
      dirty: [
        'firstName',
        'arrayItem',
        'nestItem',
        'lastName',
        'selectNumber',
        'pattern',
        'min',
        'max',
        'minDate',
        'maxDate',
        'minLength',
        'minRequiredLength',
      ],
      isSubmitted: true,
      isSubmitSuccessful: false,
      submitCount: 0,
      isValid: true,
    };
    // @grit suppress
/*
expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState2);
*/

    await page.locator('#submit').click();

    const expectedState3 = {
      isDirty: true,
      touched: [
        'nestItem',
        'firstName',
        'arrayItem',
        'lastName',
        'selectNumber',
        'pattern',
        'min',
        'max',
        'minDate',
        'maxDate',
        'minLength',
        'minRequiredLength',
      ],
      dirty: [
        'firstName',
        'arrayItem',
        'nestItem',
        'lastName',
        'selectNumber',
        'pattern',
        'min',
        'max',
        'minDate',
        'maxDate',
        'minLength',
        'minRequiredLength',
      ],
      isSubmitted: true,
      isSubmitSuccessful: true,
      submitCount: 1,
      isValid: true,
    };
    // @grit suppress
/*
expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState3);
*/

    await page.locator('#resetForm').click();

    const expectedState4 = {
      isDirty: false,
      touched: [],
      dirty: [],
      isSubmitted: false,
      isSubmitSuccessful: false,
      submitCount: 0,
      isValid: true,
    };
    expect(JSON.parse(await page.locator('#state').textContent())).toEqual(expectedState4);

    // @grit suppress
 // await expect(page.locator('#renderCount')).toHaveText('1');
  });
});
