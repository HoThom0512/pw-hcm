
import {Page, expect} from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';


test (' Step 1 login to system', async({roleUserOanh,page})=>{

 await test.step ('Step 2 navigate to My time',async()=> {
 await page.getByRole('link',{name:'My Time', exact:true}).click();
 await page.getByText('My Working Mode').click();
 
 const rows = [
    {locatorBox:'div.relative > div.row:nth-child(1) > div.box-empty', location:'BV TOWER', mode:'offshore'},

    {locatorBox:'div.relative > div.row:nth-child(2) > div.box-empty', location:'COPAC', mode:'onsite'}
    
    ]

async function selectMode (page, locatorBox, location, mode) {  
await page.locator(locatorBox).nth(0).click();

//waiting pop up option open
const popupOptionMode = page.locator('div[class*="box-wfh"]').first(); // 
await popupOptionMode.waitFor({state:'visible'});


// hover on offshore box to show dropdown 
const offshoreMode = page.locator(`div.ant-space-item > div.box-${mode}`);
await offshoreMode.hover();

// waiting dropdown list visible 
const dropdownMenuOffshore = page.locator('ul.ant-dropdown-menu');
await dropdownMenuOffshore.waitFor({state:'visible'});

//waiting list item attched

const listItemDropdownOffshore = page.locator('ul.ant-dropdown-menu');
await page.waitForSelector('ul.ant-dropdown-menu');
await page.locator(`//span[text() ="${location}"]`).click();
console.log(`mode sau khi chọn AM, PM ${location} và ${mode}`);

//AM,PM: waiting box and status boder changed 
const selectedRowAM = await page.locator(`div.box-${mode}[status="1"] div.style-border-by-status`).nth(19);

await selectedRowAM.waitFor({state:'visible'});

// waiting Save button visible and enable
const saveButton = page.getByRole('button',{name:'Save'});
await saveButton.waitFor({state:'visible'});
await expect(saveButton).toBeEnabled();
await saveButton.click();
}
// use for of to click on check box AM,PM row 
for (const row of rows) {
await selectMode(page, row.locatorBox, row.location, row.mode);

}

 });
});






