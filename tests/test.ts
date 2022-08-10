import { expect, test } from '@playwright/test';

test('index page loads with default settings', async ({ page }) => {
	await page.goto('http://127.0.0.1:4173');
	expect(await page.innerHTML('button.cell')).toBe('');
});
