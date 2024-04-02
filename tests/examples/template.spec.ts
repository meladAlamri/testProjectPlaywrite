import {test, expect} from '@playwright/test';

//AAA Pattern
// [Arrange]
// [Act]
// [Assert]

const password = process.env.PASSWORD;

test.beforeAll(async ({ playwright }) => {
    test.skip(
        !!process.env.PROD,
        "Test intentionally skipped in production due to data dependency"
    );
    /**
     * start a server
     * creat a db connection
     * reuse a sign in state
     * */

});

test.beforeEach( async ({page}, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    /**
     * open an url
     * clean up the db
     * create a page object
     * dismiss a modal
     * load params
     * */
});

test.afterAll( async ({page}, testInfo) =>{
    console.log("Test file completed.");
    /**
     * close a DB connection
     * */
});

test.afterEach( async ({page}, testInfo) =>{
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    /**
     * clean up all the data we created for this test through api calls
     * */
});

test.describe('Test Case', () =>{
    test('Test Scenario one', async () =>{
       await test.step('Step One', async () =>{

       });
        await test.step('Step Two', async () =>{

        });
    });
    test('Test Scenario Two', async () =>{
        await test.step('Step One', async () =>{

        });
        await test.step('Step Two', async () =>{

        });
    });
})






