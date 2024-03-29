import {test, expect} from '@playwright/test';
import path from "node:path";
/**
 * Breakout Activity: 20 minute
 * navigate to <a href="https://the-internet.herokuapp.com/upload">Upload Test</a>
 * uploading any file from your machine (make it small please)
 * checking to see that the file was successfully uploaded
 */

test('Upload File', async ({page}) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator("#file-upload").setInputFiles(path.join(process.cwd(),"\\Golden rules\\XpathGoldenRules.txt"));
    await page.locator("#file-submit").click()
    await expect(page.locator("h3")).toHaveText("File Uploaded!");

});