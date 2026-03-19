import { test, expect } from '@playwright/test';

test.describe('ShopSmart E2E', () => {
    test('homepage loads with title', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('ShopSmart');
    });

    test('shows backend status heading', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Backend Status' })).toBeVisible();
    });

    test('shows products list', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('input[type="text"]')).toBeVisible();
    });
});
