import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});
test('buttons should be clickable', async ({ page }) => {
  const customizeBtn = page.getByRole('button', { name: 'Customize' });
  await expect(customizeBtn).toBeVisible();
  await expect(customizeBtn).toBeEnabled();
  await customizeBtn.click();
  const submitBtn = page.getByRole('button', { name: 'Submit' });
  await expect(submitBtn).toBeVisible();
  await expect(submitBtn).toBeEnabled();
  await submitBtn.click();
});
