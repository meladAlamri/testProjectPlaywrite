import {test, Page} from '@playwright/test';
import {HomePage} from '../Pages/home-page';
import {TopMenuPage} from "../Pages/top-menu-page";

import {BatchInfo, Configuration,EyesRunner,ClassicRunner,VisualGridRunner,
BrowserType, DeviceName, ScreenOrientation, Eyes, Target}  from '@applitools/eyes-playwright';
import conf from "../config";

const url = "https://playwright.dev/";
let homepage: HomePage;
let topMenuPage: TopMenuPage;

const pageUrl = /.*intro/

//export const USE_ULTRAFAST_GRID: boolean = true;
export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
test.beforeAll(async () => {

    Runner = USE_ULTRAFAST_GRID ? new VisualGridRunner({testConcurrency: 5}) : new ClassicRunner();
    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid': 'Classic runner';
    Batch = new BatchInfo({name: `Playwright website - ${runnerName}`})

    Config = new Configuration();
    Config.setApiKey(conf.key);

    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID){
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }

});
test.beforeEach(async ({page}) => {
    eyes = new Eyes(Runner, Config)
    await eyes.open(
        page,
        'Playwright',
        test.info().title,
        {width: 1024, height: 768 }
    );
    await page.goto(url);
    homepage = new HomePage(page);
});

test.afterEach( async () =>{
    await eyes.close();
});

test.afterAll( async () =>{
   const results = await  Runner.getAllTestResults();
    console.log('visual test results' , results);
});

async function clickGetStarted(page: Page) {
    //await page.getByRole('link', { name: 'Get started' }).click();
    await homepage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}


test.describe.only('Playwright website', () => {
    test('has title', async () => {
        await homepage.assertPageTitle();
        await eyes.check('Home page', Target.window().fully());
    });
    test('get started link', async ({page}) => {

        await clickGetStarted(page)
        await topMenuPage.assertPageUrl(pageUrl);
        await eyes.check('Get Started page', Target.window().fully().layout());
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
           await eyes.check('Java page', Target.window().fully().ignoreColors());
        });
    });
});
