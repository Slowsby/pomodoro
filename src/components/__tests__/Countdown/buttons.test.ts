import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});
test('buttons should be clickable', async ({ page }) => {
  const startButton = page.locator('.startBtn');
  await expect(startButton).toBeVisible();
  await expect(startButton).toBeEnabled();
  await startButton.click();
  const pauseButton = page.locator('.pauseBtn');
  await expect(pauseButton).toBeVisible();
  await expect(pauseButton).toBeEnabled();
  await pauseButton.click();
});
test('shows skip button after starting', async ({ page }) => {
  await expect(page.locator('.skipBtn')).toHaveClass(/hidden/);
  await page.locator('.startBtn').click();
  await expect(page.locator('.skipBtn')).toHaveClass(/block/);
});
