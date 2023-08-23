import { test, expect } from '@playwright/test';

test.describe('form state', () => {
  async function getState(page) {
    return JSON.parse(await page.locator('#state').textContent());
  }

  test.skip('should return correct form state with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');

    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    expect(await getState(page)).toEqual({
      dirty: ['firstName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('');
    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();
    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="lastName"]').fill('');

    await page.locator('#submit').click();
    expect(await getState(page)).toEqual({
      dirty: ['firstName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('#submit').click();
    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('14');
  });

  test.skip('should return correct form state with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');

    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    expect(await getState(page)).toEqual({
      dirty: ['firstName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('');
    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();
    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('input[name="lastName"]').fill('');

    await page.locator('#submit').click();
    expect(await getState(page)).toEqual({
      dirty: ['firstName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('#submit').click();
    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('14');
  });

  test.skip('should return correct form state with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');

    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    expect(await getState(page)).toEqual({
      dirty: ['firstName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('');
    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();
    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('input[name="lastName"]').fill('');

    await page.locator('#submit').click();
    expect(await getState(page)).toEqual({
      dirty: ['firstName'],
      isSubmitted: true,
      submitCount: 1,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('#submit').click();
    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: true,
      submitCount: 2,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: true,
      isValid: true,
    });
    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('15');
  });

  test.skip('should reset dirty value when inputs reset back to default with onSubmit mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onSubmit');
    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('');
    await page.locator('input[name="lastName"]').fill('');

    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('select[name="select"]').selectOption('test1');
    await page.locator('select[name="select"]').blur();
    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: ['select'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/
    await page.locator('select[name="select"]').selectOption('');

    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/

    // @grit suppress
    // Clicking the checkbox does not change its state
    // await page.locator('input[name="checkbox"]').check();
    await page.locator('input[name="checkbox"]').blur();
    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: ['checkbox'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select', 'checkbox'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/

    await page.locator('input[name="checkbox"]').uncheck();
    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName', 'select', 'checkbox'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/

    await page.locator('input[name="checkbox-checked"]').uncheck();
    await page.locator('input[name="checkbox-checked"]').blur();
    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: ['checkbox-checked'],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked'
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/
    await page.locator('input[name="checkbox-checked"]').check();
    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked'
      ],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/

    await page.locator('input[name="radio"]').check();
    await page.locator('input[name="radio"]').blur();
    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: ['radio'],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked',
        'radio'
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/

    await page.locator('select[name="select"]').selectOption('');
    // @grit suppress
    /*
expect(await getState(page)).toEqual({
      dirty: ['radio'],
      isSubmitted: false,
      submitCount: 0,
      touched: [
        'firstName',
        'lastName',
        'select',
        'checkbox',
        'checkbox-checked',
        'radio'
      ],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false
    });
*/
    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('18');
  });

  test.skip('should reset dirty value when inputs reset back to default with onBlur mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onBlur');
    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('input[name="firstName"]').fill('');
    await page.locator('input[name="lastName"]').fill('');
    await page.locator('input[name="lastName"]').blur();

    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });
    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('8');
  });

  test.skip('should reset dirty value when inputs reset back to default with onChange mode', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/formState/onChange');
    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    expect(await getState(page)).toEqual({
      dirty: ['firstName', 'lastName'],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: true,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: true,
    });

    await page.locator('#resetForm').click();

    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: [],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    await page.locator('input[name="firstName"]').fill('test');
    await page.locator('input[name="firstName"]').blur();
    await page.locator('input[name="lastName"]').fill('test');
    await page.locator('input[name="lastName"]').blur();

    await page.locator('input[name="firstName"]').fill('');
    await page.locator('input[name="lastName"]').fill('');

    expect(await getState(page)).toEqual({
      dirty: [],
      isSubmitted: false,
      submitCount: 0,
      touched: ['firstName', 'lastName'],
      isDirty: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      isValid: false,
    });

    // @grit suppress
    // await expect(page.locator('#renderCount')).toHaveText('13');
  });
});
