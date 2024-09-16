import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});

const btns = ['.startBtn', '.pauseBtn', '.customizeBtn', '.customizeDiv'];
test('checks blue colors', async ({ page }) => {
  // Check blue version
  await expect(page.locator('.mainBg')).toHaveClass(/bg-\[#114b5f\]/);
  await page.locator('.customizeBtn').click();
  for (let i = 0; i < btns.length; i++) {
    await expect(page.locator(btns[i])).toHaveClass(/bg-\[#028090\]/);
  }
  // Tasks
  await expect(page.locator('.cancelBtn')).toHaveClass(/bg-red-600/);
  await expect(page.locator('.confirmBtn')).toHaveClass(/bg-green-600/);
  await expect(page.locator('.taskModal')).toHaveClass(/bg-\[#5d8b9c\]/);
});

test('checks green colors', async ({ page }) => {
  // Check green version
  await page.locator('.startBtn').click();
  await page.locator('.skipBtn').click();
  await expect(page.locator('.mainBg')).toHaveClass(/bg-\[#0A5C32\]/);
  await page.locator('.customizeBtn').click();
  for (let i = 0; i < btns.length; i++) {
    await expect(page.locator(btns[i])).toHaveClass(/bg-\[#0E8145\]/);
  }
  // Tasks
  await expect(page.locator('.taskModal')).toHaveClass(/bg-\[#4d7e5c\]/);
});
