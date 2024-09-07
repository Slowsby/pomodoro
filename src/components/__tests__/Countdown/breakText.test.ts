import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});

test('shows break text', async ({ page }) => {
  for (let i = 0; i < 7; i++) {
    await page.locator('.startBtn').click();
    await page.locator('.skipBtn').click();
    await page.waitForTimeout(1000);
    if (i === 0) {
      await expect(page.locator('.breakText')).toContainText('Short Break!');
    }
    if (i === 6) {
      await expect(page.locator('.breakText')).toContainText('Long Break!');
    }
  }
});
