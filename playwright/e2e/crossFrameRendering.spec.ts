import { expect, test } from '@playwright/test';

async function getIframe(page) {
  const iframeElement = await page.locator('iframe');
  const iframe = await iframeElement.contentFrame();
  return iframe;
}

test.describe('Cross-Frame rendering', () => {
  test('should work correctly when rendering inside frames', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/crossFrameForm');
    const iframe = await getIframe(page);
    await iframe.locator('input[type="text"]').fill('test');
    await iframe.locator('input[type="radio"][value="a"]').click();
    await iframe.locator('input[type="radio"][value="b"]').click();
    await expect(iframe.locator('pre')).toHaveText(
      '{"input":"test","radio":"b"}',
    );
  });
});
