import {test, expect} from '@playwright/test';
import ProfilePage from '../pages/profile-page'
import pages from "../../utils/pages";

let  profilePage: ProfilePage


test.beforeEach( async ({page}) => {
    await page.goto(pages.profile);
    profilePage = new ProfilePage(page)
});

test.describe.only('Profile - stored Auth',() =>{
   test('check logged in', async () =>{
      await profilePage.checkLoggedIn();
   });
});