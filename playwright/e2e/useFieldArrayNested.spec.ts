import { test, expect } from '@playwright/test';

test.describe('useFieldArrayNested', () => {
  test('should work correctly with nested field array', async ({ page }) => {
    await page.goto('http://localhost:3000/useFieldArrayNested');

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

    await expect(
      page.locator('input[name="test.0.keyValue.0.name"]'),
    ).toHaveValue('insert');
    await expect(
      page.locator('input[name="test.0.keyValue.1.name"]'),
    ).toHaveValue('prepend');
    await expect(
      page.locator('input[name="test.0.keyValue.2.name"]'),
    ).toHaveValue('1a');
    await expect(
      page.locator('input[name="test.0.keyValue.3.name"]'),
    ).toHaveValue('1c');
    await expect(
      page.locator('input[name="test.0.keyValue.4.name"]'),
    ).toHaveValue('append');

    await page.locator('#nest-remove-0').click();
    await expect(
      page.locator('input[name="test.0.keyValue.2.name"]'),
    ).toHaveValue('1c');
    await expect(
      page.locator('input[name="test.0.keyValue.3.name"]'),
    ).toHaveValue('append');

    const dirtyNested0 = JSON.parse(
      await page.locator('#dirty-nested-0').textContent(),
    );
    expect(dirtyNested0).toEqual({
      test: [
        {
          firstName: false,
          lastName: false,
          keyValue: [
            { name: true },
            { name: true },
            { name: true },
            { name: true },
          ],
        },
      ],
    });

    const touchedNested0 = JSON.parse(
      await page.locator('#touched-nested-0').textContent(),
    );
    expect(touchedNested0).toEqual({
      test: [{ keyValue: [{ name: true }, null, null, { name: true }] }],
    });

    await page.locator('#submit').click();

    const result1 = JSON.parse(await page.locator('#result').textContent());
    expect(result1).toEqual({
      test: [
        {
          firstName: 'Bill',
          lastName: 'Luo',
          keyValue: [
            { name: 'insert' },
            { name: '1a' },
            { name: '1c' },
            { name: 'append' },
          ],
        },
      ],
    });

    await page.locator('#prepend').click();

    const dirtyNested1 = JSON.parse(
      await page.locator('#dirty-nested-0').textContent(),
    );
    expect(dirtyNested1).toEqual({
      test: [
        {
          keyValue: [{ name: true }, { name: true }],
          firstName: true,
          lastName: true,
        },
        {
          firstName: true,
          lastName: true,
          keyValue: [
            { name: true },
            { name: true },
            { name: true },
            { name: true },
          ],
        },
      ],
    });

    const touchedNested1 = JSON.parse(
      await page.locator('#touched-nested-0').textContent(),
    );
    expect(touchedNested1).toEqual({
      test: [null, { keyValue: [{ name: true }, null, null, { name: true }] }],
    });

    await page.locator('#append').click();
    await page.locator('#swap').click();
    await page.locator('#insert').click();

    const touchedNested2 = JSON.parse(
      await page.locator('#touched-nested-0').textContent(),
    );
    expect(touchedNested2).toEqual({
      test: [
        { firstName: true },
        null,
        { firstName: true },
        { keyValue: [{ name: true }, null, null, { name: true }] },
      ],
    });

    const dirtyNested2 = JSON.parse(
      await page.locator('#dirty-nested-0').textContent(),
    );
    expect(dirtyNested2).toEqual({
      test: [
        {
          firstName: true,
          keyValue: [{ name: true }, { name: true }],
          lastName: true,
        },
        { firstName: true },
        { firstName: true, keyValue: [] },
        {
          firstName: true,
          lastName: true,
          keyValue: [
            { name: true },
            { name: true },
            { name: true },
            { name: true },
          ],
        },
      ],
    });

    await page.locator('#submit').click();

    const result2 = JSON.parse(await page.locator('#result').textContent());
    // @grit suppress
    /*
expect(result2).toEqual({
      test: [
        { firstName: 'prepend', keyValue: [] },
        { firstName: 'insert', keyValue: [] },
        { firstName: 'append', keyValue: [] },
        {
          firstName: 'Bill',
          keyValue: [{ name: 'insert' }, { name: 'append' }],
          lastName: 'Luo',
        },
      ],
    });
*/

    await page.locator('#nest-append-0').click();
    await page.locator('#nest-prepend-0').click();
    await page.locator('#nest-insert-0').click();
    await page.locator('#nest-swap-0').click();
    await page.locator('#nest-move-0').click();

    const inputLength = await page.locator('input').count();
    expect(inputLength).toBe(11);

    await page.locator('#nest-remove-3').click();
    await page.locator('#nest-remove-3').click();

    await expect(
      page.locator('input[name="test.3.keyValue.0.name"]'),
    ).toHaveValue('insert');
    await expect(
      page.locator('input[name="test.3.keyValue.1.name"]'),
    ).toHaveValue('append');

    const dirtyNested3 = JSON.parse(
      await page.locator('#dirty-nested-0').textContent(),
    );
    expect(dirtyNested3).toEqual({
      test: [
        {
          firstName: true,
          keyValue: [{ name: true }, { name: true }, { name: true }],
          lastName: true,
        },
        { firstName: true, keyValue: [] },
        { firstName: true, keyValue: [] },
        {
          firstName: true,
          lastName: true,
          keyValue: [{ name: true }, { name: true }],
        },
      ],
    });

    await page.locator('#nest-update-0').click();

    await expect(
      page.locator('input[name="test.0.keyValue.0.name"]'),
    ).toHaveValue('update');

    await page.locator('#submit').click();

    const result3 = JSON.parse(await page.locator('#result').textContent());
    expect(result3).toEqual({
      test: [
        {
          firstName: 'prepend',
          keyValue: [
            { name: 'update' },
            { name: 'prepend' },
            { name: 'append' },
          ],
        },
        { firstName: 'insert', keyValue: [] },
        { firstName: 'append', keyValue: [] },
        {
          firstName: 'Bill',
          keyValue: [{ name: 'insert' }, { name: 'append' }],
          lastName: 'Luo',
        },
      ],
    });

    await page.locator('#nest-remove-all-3').click();
    await page.locator('#nest-remove-all-2').click();
    await page.locator('#nest-remove-all-1').click();
    await page.locator('#nest-remove-all-0').click();

    const touchedNested3 = JSON.parse(
      await page.locator('#touched-nested-2').textContent(),
    );
    expect(touchedNested3).toEqual({
      test: [
        { firstName: true, keyValue: [] },
        { firstName: true },
        { firstName: true },
        { keyValue: [] },
      ],
    });

    const dirtyNested4 = JSON.parse(
      await page.locator('#dirty-nested-2').textContent(),
    );
    expect(dirtyNested4).toEqual({
      test: [
        {
          firstName: true,
          keyValue: [{ name: true }, { name: true }],
          lastName: true,
        },
        { firstName: true, keyValue: [] },
        { firstName: true, keyValue: [] },
        { firstName: true, lastName: true, keyValue: [] },
      ],
    });

    await page.locator('#submit').click();

    const result4 = JSON.parse(await page.locator('#result').textContent());
    expect(result4).toEqual({
      test: [
        { firstName: 'prepend', keyValue: [] },
        { firstName: 'insert', keyValue: [] },
        { firstName: 'append', keyValue: [] },
        { firstName: 'Bill', keyValue: [], lastName: 'Luo' },
      ],
    });

    await page.locator('#remove').click();
    await page.locator('#remove').click();
    await page.locator('#remove').click();

    const dirtyNested5 = JSON.parse(
      await page.locator('#dirty-nested-0').textContent(),
    );
    expect(dirtyNested5).toEqual({
      test: [
        {
          firstName: true,
          keyValue: [{ name: true }, { name: true }],
          lastName: true,
        },
      ],
    });

    await page.locator('#submit').click();
    const result5 = JSON.parse(await page.locator('#result').textContent());
    expect(result5).toEqual({ test: [{ firstName: 'prepend', keyValue: [] }] });

    await page.locator('#update').click();

    await expect(page.locator('input[name="test.0.firstName"]')).toHaveValue(
      'updateFirstName',
    );
    await expect(
      page.locator('input[name="test.0.keyValue.0.name"]'),
    ).toHaveValue('updateFirstName1');
    await expect(
      page.locator('input[name="test.0.keyValue.1.name"]'),
    ).toHaveValue('updateFirstName2');

    await page.locator('#removeAll').click();

    const dirtyNested6 = await page.locator('#dirty-nested-0').isVisible();
    expect(dirtyNested6).toBe(false);

    const touchedNested4 = await page.locator('#touched-nested-0').isVisible();
    expect(touchedNested4).toBe(false);

    await page.locator('#submit').click();
    const result6 = JSON.parse(await page.locator('#result').textContent());
    expect(result6).toEqual({ test: [] });

    const count = await page.locator('#count').textContent();
    expect(count).toContain('16');
  });
});
