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
test('Does timer work', async ({ page }) => {
  const initialTime = await page.locator('.countdownTimer').textContent();
  await page.locator('.startBtn').click();
  await page.waitForTimeout(1000);
  const finalTime = await page.locator('.countdownTimer').textContent();
  expect(initialTime).not.toBe(finalTime);
});
test('shows skip button after starting', async ({ page }) => {
  await expect(page.locator('.skipBtn')).toHaveClass(/hidden/);
  await page.locator('.startBtn').click();
  await expect(page.locator('.skipBtn')).toHaveClass(/block/);
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
test('Updates pomodoro count', async ({ page }) => {
  const initial = await page.locator('.pomodoro').textContent();
  for (let i = 0; i < 2; i++) {
    await page.locator('.startBtn').click();
    await page.locator('.skipBtn').click();
    await page.waitForTimeout(1000);
  }
  const final = await page.locator('.pomodoro').textContent();
  expect(initial).not.toBe(final);
});
