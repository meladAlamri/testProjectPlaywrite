import {test, expect} from '@playwright/test';

/**
 * navigate to <a href="https://www.selenium.dev/selenium/web/web-form.html">web form test page</a>
 * check the box and validate that it is checked
 * select the radio and validate that it is selected
 * choose an item (by value) from the select dropdown menu and validate that it is selected (by text)
 */
let url = 'https://www.selenium.dev/selenium/web/web-form.html';
test('Radio check', async ({page}) => {
    await page.goto(url);
    const radioButton = await page.getByLabel('Default radio');
    await radioButton.click();
    await expect(radioButton).toBeChecked()

});

test('Dropdown-menu-selection', async ({page}) =>{
    await page.goto(url);
    const selectItem = await page.getByLabel('Dropdown (select)');
    await selectItem.selectOption({ value: '2' });
    await expect(selectItem).toContainText('Two')
});

