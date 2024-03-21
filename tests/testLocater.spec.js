import {test, expect} from '@playwright/test';
/**
 * breakout task:
 * <br/> - navigate to this url <a href="https://www.saucedemo.com/v1/index.html... * <br/> - do a successful login
 * <br/> - assert that the login is successful
 */

/**
 * breakout task:
 * <br/> - navigate to this url <a href="https://www.saucedemo.com/v1/index.html">SauceDemo</a>
 * <br/> - do a locked_out_user login
 * <br/> - assert that the login was not successful (do a negative test, and a positive test)
 */
test('a successful login sauce demo', async ({page}) => {
    await page.goto('https://www.saucedemo.com/v1/index.html');
    await page.locator('#user-name').fill("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
});

test('a filed login negative test', async ({page}) => {
    await page.goto('https://www.saucedemo.com/v1/index.html');
    await page.locator('#user-name').fill("locked_out_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/index.html");
});

test('a filed login positive test', async ({page} ) => {
    await page.goto('https://www.saucedemo.com/v1/index.html');
    await page.locator('#user-name').fill("locked_out_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();
    await expect (page.locator("data-test=error")).toHaveText("Epic sadface: Sorry, this user has been locked out.")
});


