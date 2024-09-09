import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});

test('date displays correct AM format', async ({ page }) => {
  await page.clock.install({ time: new Date('2024-01-01T08:00:00') });
  await page.goto('http://localhost:3000/pomodoro/');
  await page.clock.pauseAt(new Date('2024-01-01T09:59:59'));
  await expect(page.locator('.date')).toHaveText('9:59 am');
});

test('date displays correct PM format', async ({ page }) => {
  await page.clock.install({ time: new Date('2024-01-01T20:00:00') });
  await page.goto('http://localhost:3000/pomodoro/');
  await page.clock.pauseAt(new Date('2024-01-01T22:38:25'));
  await expect(page.locator('.date')).toHaveText('10:38 pm');
});
