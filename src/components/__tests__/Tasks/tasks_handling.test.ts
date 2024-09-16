import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/pomodoro/');
});

test('creates a task', async ({ page }) => {
  await page.locator('.addTaskBtn').click();
  await expect(page.locator('.taskModal')).not.toHaveClass(/hidden/);
  await page.locator('.taskInput').fill('test');
  await page.locator('.confirmBtn').click();
  expect(page.locator('.taskContent')).toHaveCount(1);
  await expect(page.locator('.taskContent')).toContainText('test');
});
test('finishes a task', async ({ page }) => {
  // Recreates a task
  await page.locator('.addTaskBtn').click();
  await expect(page.locator('.taskModal')).not.toHaveClass(/hidden/);
  await page.locator('.taskInput').fill('test');
  await page.locator('.confirmBtn').click();
  await expect(page.locator('.taskContent')).toContainText('test');
  // Creates two tasks, deletes one then checks if there's only one, stupid but works
  await page.locator('.addTaskBtn').click();
  await expect(page.locator('.taskModal')).not.toHaveClass(/hidden/);
  await page.locator('.taskInput').fill('test');
  await page.locator('.confirmBtn').click();
  // Press the finish, then checks if it still exists
  await page.locator('.finishBtn').first().click();
  await expect(page.locator('.taskContent')).toHaveCount(1);
});
