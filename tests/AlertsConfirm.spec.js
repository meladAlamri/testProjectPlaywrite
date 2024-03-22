import {test, expect} from '@playwright/test';

/**
 * Breakout task: 15 minutes
 * Navigate to <a href="https://the-internet.herokuapp.com/javascript_alerts">Alerts</a>
 * click on "Click for JS Confirm"
 * Press OK
 * Check that "You clicked: Ok" is displayed
 */

test('JSConfirm', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole("button",{ name: /Click for JS Confirm/i }).click()
    await expect(page.locator("#result")).toHaveText("You clicked: Ok")
});