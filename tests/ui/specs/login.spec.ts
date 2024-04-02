import {test, expect} from '@playwright/test';
import LoginPage from '../pages/login-page';
import pages from '../../utils/pages'
import userData from '../../../data/resources/testData/user-data'

const userName = process.env.USERNAME
const password = process.env.PASSWORD
let loginPage: LoginPage

 test.use({storageState :{cookies: [], origins: []} } );
//
 test.describe.configure({mode: 'serial'});

test.beforeEach(async ({page}) => {
    await page.goto(pages.loginPage)
    loginPage = new LoginPage(page);
});

test.describe('Book Store - Login', () => {
    test('successful login', async () => {
        await loginPage.doLogin(userName, password)
        await loginPage.checkLoggedIn();
    });

    test('falling login - invalid username', async () => {
        const invalidUsername = userData.invalidUsername;
        await loginPage.doLogin(invalidUsername, password)
        await loginPage.checkInvalidCredentials()
    });

    test('falling login - invalid password', async () => {
        const invalidPassword = userData.invalidUsername;
        await loginPage.doLogin(userName, invalidPassword)
        await loginPage.checkInvalidCredentials()
    });
})