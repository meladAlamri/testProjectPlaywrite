import {test} from '@playwright/test';

/**
 * Breakout task: 15 minutes
 * Navigate to <a href="https://kitchen.applitools.com/ingredients/cookie">Cookies</a>
 * print the total number of cookies
 * add a new "fruit=apple" cookie
 * edit the "protein" cookie to have the value "meat"
 * delete the "vegetable" cookie
 * print all cookies
 * delete all cookies
 */

let url = "https://kitchen.applitools.com/ingredients/cookie";
test('Cookies', async ({page,context}) => {

    await page.goto(url);

    //print the total number of cookies
    let cookies = (await context.cookies());
    console.log("The total number of cookies " + cookies.length);

    //add a new "fruit=apple" cookie
    let cookie = add_edit_cookie("fruit", "apple");
    await context.addCookies([cookie]);
    cookies = await context.cookies();
    printCookies(cookies)

    //edit the "protein" cookie to have the value "meat"
    cookie = add_edit_cookie("protein", "meat")
    await context.addCookies([cookie]);
    cookies = await context.cookies();
    printCookies(cookies)

    //delete the "vegetable" cookie
    let filteredCookies = (await context.cookies())
        .filter((cookie) => cookie.name !== "vegetable")
    await context.clearCookies();
    await context.addCookies(filteredCookies)
    cookies = context.cookies();
    printCookies(cookies)

    //delete all cookies
    await context.clearCookies();
    cookies = await context.cookies();
    printCookies(cookies)

});


function printCookies(cookies) {
    console.log("--------------------------")
    console.log("The new lest is ");
    console.log(cookies);
    console.log("The total number of cookies are " + cookies.length);

}

function add_edit_cookie(name, value) {
    return {
        name: name,
        value: value,
        domain: "kitchen.applitools.com",
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax'
    };
}