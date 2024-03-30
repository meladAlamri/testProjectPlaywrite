import {test, Page} from '@playwright/test';
import {HomePage} from '../Pages/home-page';
import {TopMenuPage} from "../Pages/top-menu-page";

//AAA
//POM

const url = "https://playwright.dev/"
let homepage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/
test.beforeEach(async ({page}) => {
    await page.goto(url);
    homepage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    //await page.getByRole('link', { name: 'Get started' }).click();
    await homepage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}

test.describe.only('Playwright website', () => {
    test('has title', async () => {

        // Expect a title "to contain" a substring.
        await homepage.assertPageTitle();
    });
    test('get started link', async ({page}) => {

        // Click the get started link.
        await clickGetStarted(page)
        // Expects page to have a heading with the name of Installation.
        await topMenuPage.assertPageUrl(pageUrl);
    });

    test('check java page', async ({page}) => {
        await test.step('Act', async () => {
            await clickGetStarted(page)
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });
        await test.step('Assert', async () => {
           await topMenuPage.assertPageUrl(pageUrl);
           await topMenuPage.assertNodeDescriptionNoVisible();
           await topMenuPage.assertJavaDescriptionVisible();
        });
    });
});
