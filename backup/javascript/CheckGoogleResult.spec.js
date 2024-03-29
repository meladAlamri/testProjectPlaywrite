import {test, expect} from '@playwright/test';

/**
 * Navigate to <a href="https://www.google.com/">Google.com</a>
 * Search for "Playwright"
 * Check that results stats is not empty
 * Using Firefox , Chrome
 */

test('Check Google Result', async ({page}) => {
    await page.goto("https://www.google.com/");
    await page.locator("#APjFqb").fill("Playwright");
    await page.keyboard.press("Enter")
    await expect(page.locator("#result-stats")).not.toHaveText("");




});