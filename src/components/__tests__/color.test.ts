import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});

test('checks every colors', async ({ page }) => {
  await expect(page.locator('.mainBg')).toHaveClass(/bg-\[#114b5f\]/);
  const blue = ['.startBtn', '.pauseBtn', '.customizeBtn', '.customizeDiv'];
  await page.locator('.customizeBtn').click();
  for (let i = 0; i < blue.length; i++) {
    await expect(page.locator(blue[i])).toHaveClass(/bg-\[#028090\]/);
  }
  await page.locator('.startBtn').click();
  await page.locator('.skipBtn').click();
  await expect(page.locator('.mainBg')).toHaveClass(/bg-\[#0A5C32\]/);
  const green = ['.startBtn', '.pauseBtn', '.customizeBtn', '.customizeDiv'];
  await page.locator('.customizeBtn').click();
  for (let i = 0; i < green.length; i++) {
    await expect(page.locator(green[i])).toHaveClass(/bg-\[#0E8145\]/);
  }
});
