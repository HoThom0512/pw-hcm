import {test} from '../src/fixture/index.fixture';
import {expect} from '@playwright/test';



test ('kiểm tra login', async ({overviewpage,page})=> {
   
    await expect(overviewpage.page).toHaveURL('https://qa-nexthcm.banvien.com.vn/overview');
    //const linkText = await overviewpage.page.locator('a.link-sidebar[href="/overview"]:has-text("Overview")').innerText();
    //await expect(linkText).toBe('Overview');



//test ('verify pop up is avaiable to click', async ({page})=>{
    

    await page.locator('text=Admin').click();
    await expect(page.locator('text=Access control management')).toHaveText('Access control management');
    
    await page.locator('text=Access control management').click();
    await expect(page).toHaveURL("https://qa-nexthcm.banvien.com.vn/admin/access-control/role");

    await page.locator('a.custom-link-header[href="/admin/access-control/permission"]').click();
    await expect(page).toHaveURL("https://qa-nexthcm.banvien.com.vn/admin/access-control/permission");

    

const buttonPopup = [

{
    buttonText: 'Filter permission by employee',
    popupSelector: 'div[class="sc-dCLGXw iVoesF"]',// selector cho pop-up "Permission Filter"
    popupText: 'h1[class="ant-typography sc-cEzcPc iZwFYj title"]',
    expectedPopupText: 'Permission By Employee',
    closePopup:'button[class="ant-btn ant-btn-default sc-egkSDF knzsGP"]',
}, 
{
    buttonText: 'Add new',
    popupSelector: 'div[class="ant-modal-content"]', // selector cho pop-up "Add new"
    popupText: 'span[class="title"]',
    expectedPopupText: 'Create Permission',
    closePopup:'button[class="ant-btn ant-btn-default sc-egkSDF fWBjjz"]',
},
];

for (let i = 0; i<buttonPopup.length; i++){
const {buttonText,popupSelector,popupText, expectedPopupText,closePopup} = buttonPopup[i];

const button = page.locator(`button`, { hasText: buttonText });

await button.click();

const popup = page.locator(popupSelector);

const popupContent = page.locator(popupText);


await expect(popupContent).toHaveText(expectedPopupText);

const closeButton = popup.locator(closePopup);

await closeButton.click();

await expect(popupContent).toBeHidden();

}
});

