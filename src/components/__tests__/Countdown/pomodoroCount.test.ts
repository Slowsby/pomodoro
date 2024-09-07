import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});

test('updates pomodoro count', async ({ page }) => {
  expect(await page.locator('.pomodoro').textContent()).toBe('Pomodoro: 1');
  for (let i = 0; i < 2; i++) {
    await page.locator('.startBtn').click();
    await page.locator('.skipBtn').click();
    await page.waitForTimeout(1000);
  }
  expect(await page.locator('.pomodoro').textContent()).toBe('Pomodoro: 2');
});
