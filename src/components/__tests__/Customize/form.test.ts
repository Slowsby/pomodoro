import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});

test('completes form', async ({ page }) => {
  const initial = await page.locator('.countdownTimer').textContent();
  await page.getByRole('button', { name: 'Customize' }).click();
  await page.getByPlaceholder('25').fill('10');
  await page.getByPlaceholder('5', { exact: true }).fill('10');
  await page.getByPlaceholder('15').fill('10');
  await page.getByRole('button', { name: 'Submit' }).click();
  const final = await page.locator('.countdownTimer').textContent();
  expect(initial).not.toBe(final);
});

test('form changes times', async ({ page }) => {
  await page.getByRole('button', { name: 'Customize' }).click();
  await page.getByPlaceholder('25').fill('10');
  const mainTime = '10:00';
  await page.getByPlaceholder('5', { exact: true }).fill('11');
  const shortBreak = '11:00';
  await page.getByPlaceholder('15').fill('12');
  const longBreak = '12:00';
  await page.getByRole('button', { name: 'Submit' }).click();
  expect(await page.locator('.countdownTimer').textContent()).toBe(mainTime);
  await page.locator('.startBtn').click();
  await page.locator('.skipBtn').click();
  await page.waitForTimeout(1000);
  expect(await page.locator('.countdownTimer').textContent()).toBe(shortBreak);
  for (let i = 0; i < 6; i++) {
    await page.locator('.startBtn').click();
    await page.locator('.skipBtn').click();
    await page.waitForTimeout(1000);
    if (i === 5) {
      expect(await page.locator('.countdownTimer').textContent()).toBe(
        longBreak,
      );
    }
  }
});
