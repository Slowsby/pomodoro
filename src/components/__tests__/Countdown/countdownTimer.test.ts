import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});
test('starts countdown timer on button click', async ({ page }) => {
  const initialTime = await page.locator('.countdownTimer').textContent();
  await page.locator('.startBtn').click();
  await page.waitForTimeout(1000);
  const finalTime = await page.locator('.countdownTimer').textContent();
  expect(initialTime).not.toBe(finalTime);
});
