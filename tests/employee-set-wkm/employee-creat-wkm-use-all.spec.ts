
import {Page, expect} from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';


test (' Step 1 login to system', async({roleUserOanh,page})=>{

 await test.step ('Step 2 navigate to My time',async()=>{
 await page.getByRole('link',{name:'My Time', exact:true}).click();
 await page.getByText('My Working Mode').click();


async function selectMode (page) {
    const rows = [
       {locator:'div.relative > div.row:nth-child(1) > div.box-empty', location:'BV TOWER', mode:'offshore'},

       {locator:'div.relative > div.row:nth-child(2) > div.box-empty', location:'COPAC', mode:'onsite'}
       
       ]

for (let i = 0; i<rows.length; i++){

    const row = rows[i]
await page.locator(row.locator).nth(0).click();
// debug to console result
console.log (` the result after click AM,PM checkbox ${i}`);
//waiting pop up option open
const popupOptionMode = page.locator('div[class*="box-wfh"]').first(); // 
await popupOptionMode.waitFor({state:'visible'});


// hover on offshore box to show dropdown 
const offshoreMode = page.locator(`div.ant-space-item > div.box-${row.mode}`);
await offshoreMode.hover();

// waiting dropdown list visible 
const dropdownMenuOffshore = page.locator('ul.ant-dropdown-menu');
await dropdownMenuOffshore.waitFor({state:'visible'});

//waiting list item attched

const listItemDropdownOffshore = page.locator('ul.ant-dropdown-menu');
await page.waitForSelector('ul.ant-dropdown-menu');
await page.locator(`//span[text() ="${row.location}"]`).click();


//AM,PM: waiting box and status boder changed 
const selectedRowAM = await page.locator(`div.box-${row.mode}[status="1"] div.style-border-by-status`).nth(i);

await selectedRowAM.waitFor({state:'visible'});


}

// waiting Save button visible and enable
const saveButton = page.getByRole('button',{name:'Save'});
await saveButton.waitFor({state:'visible'});
await expect(saveButton).toBeEnabled();
await saveButton.click();


}

await selectMode(page);

 });

});




