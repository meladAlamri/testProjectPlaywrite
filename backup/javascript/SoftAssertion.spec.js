import {test, expect} from '@playwright/test';
import * as data from '../../tests/resources/testData/sample.json';

""
/**
 * Breakout session: 30 minutes
 * navigate to https://practicetestautomation.com/practice-test-login/
 * login using "Username": "student" + "Password": "Password123" (using testdata.json is optional)
 * check that the url is correct "https://practicetestautomation.com/logged-in-successfully/"
 * check the successful login, congratulations message, and logout button are displayed
 */
const {SoftAssertionsTestData} = data;
const {username} = SoftAssertionsTestData
const {password} = SoftAssertionsTestData

test ('SoftAssertion', async ({page}) => {

    // run only with terminal

    await page.goto("https://practicetestautomation.com/practice-test-login/")

    await page.locator("#username").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("#submit").click();


    await expect.soft(page).toHaveURL("https://practicetestautomation.com/logged-in-successfully/");
    await expect.soft(page.locator(".post-title")).toBeVisible();
    await expect.soft(page.locator("strong")).toHaveText("Congratulations student. You successfully logged in!");
    await expect.soft(page.locator("//a[text()='Log out']")).toBeVisible();

    expect(test.info().errors).toHaveLength(0);


});