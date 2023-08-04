import { test, expect } from '@playwright/test';

async function getIframe(page) {
  const frameElement = await page.locator('iframe');
  const frame = await frameElement.contentFrame();
  return frame;
}

test.describe('Cross-Frame rendering', () => {
  test('should work correctly when rendering inside frames', async ({ page }) => {
    await page.goto('http://localhost:3000/crossFrameForm');
    const frame = await getIframe(page);
    await frame.locator('input[type="text"]').fill('test');
    await frame.locator('input[type="radio"][value="a"]').click();
    await frame.locator('input[type="radio"][value="b"]').click();
    await expect(frame.locator('pre')).toHaveText('{"input":"test","radio":"b"}');
  });
});
