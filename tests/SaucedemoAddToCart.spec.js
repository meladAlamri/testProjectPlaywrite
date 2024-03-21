import {test, expect} from '@playwright/test';

/**
 * Navigate to <a href="https://www.saucedemo.com/v1/index.html">SauceDemo</a>
 * login as standard_user
 * assert that there are 6 items on the products list page
 * add the first and last items to the cart
 * navigate to the cart and check that both items are listed
 */
let username = "standard_user";
let password = "secret_sauce";
test('Sauce Demo Add To Cart', async ({page}) => {

    await login(page,expect,username, password);
    await expect((await page.locator('.inventory_item').all()).length).toBe(6);

});

test('check first item in cart',async ({page}) => {
    await login(page,expect,username,password);
    await addToCart(page,1,6)
    await expect(page.locator("(//div[@class='inventory_item_name'])[1]")).toHaveText("Sauce Labs Backpack");

});

test('check sixth item in cart',async ({page}) => {
    await login(page,expect,username,password);
    await addToCart(page,1,6)
    await expect(page.locator("(//div[@class='inventory_item_name'])[2]")).toHaveText("Test.allTheThings() T-Shirt (Red)");

});


async function login(page,expect,username, password) {
    await page.goto("https://www.saucedemo.com/v1/index.html");
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
}

async function addToCart(page,item1,item2 ) {
    await page.locator('(//button[contains(@class, "btn_inventory")])['+item1+']').click();
    await page.locator('(//button[contains(@class, "btn_inventory")])['+item2+']').click();
    await page.goto("https://www.saucedemo.com/v1/cart.html");
}