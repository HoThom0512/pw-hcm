
import {Page, expect} from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';


test (' Step 1 login to system', async({roleUserOanh,page})=>{

 await test.step ('Step 2 navigate to My time',async()=>{
 await page.getByRole('link',{name:'My Time', exact:true}).click();
 await page.getByText('My Working Mode').click();

//locator rowAM
const rowAM = await page.locator('div.relative > div.row:nth-child(1) > div.box-empty').nth(1);
//locator rowPM
const rowPM = await page.locator('div.relative > div.row:nth-child(2) > div.box-empty').nth(30);

// drage start rowAM and end rowPM
await rowAM.dragTo(rowPM)

const rowAMSelect = page.locator('div.row:nth-child(1) > div.box-select').nth(1);
const rowPMSelect = page.locator('div.row:nth-child(2) > div.box-select').nth(30);

// waiting the popup visible
//const popupOptionMode = page.locator('div.sc-unGvv.fNpSwm');
const popupOptionMode = page.locator('div[class*="box-wfh"]').first(); // 
await popupOptionMode.waitFor({state:'visible'});


// hover on offshore box to show dropdown 
const offshoreMode = page.locator('div.ant-space-item > div.box-offshore');
await offshoreMode.hover();

// waiting dropdown list visible 
const dropdownMenuOffshore = page.locator('ul.ant-dropdown-menu');
await dropdownMenuOffshore.waitFor({state:'visible'});

//waiting list item attched

const listItemDropdownOffshore = page.locator('ul.ant-dropdown-menu');
await page.waitForSelector('ul.ant-dropdown-menu');
await page.locator('//span[text() ="ACB"]').click();


//sau khi click mode wfh chờ mode hiển thị đã chọn bao gồm mode và boder status
//AM
const selectedRowAM = await page.locator('div.box-offshore[status="1"] div.style-border-by-status').nth(0);
//await page.waitForSelector('div.sc-gCNZBk.dMyFog.relative div.row .box-wfh');
await selectedRowAM.waitFor({state:'visible'});

//PM
const selectedRowPM = await page.locator('div.box-offshore[status="1"] div.style-border-by-status').nth(30);
await selectedRowPM.waitFor({state:'visible'});

// chờ Save button visible and enable

const saveButton = page.getByRole('button',{name:'Save'});
await saveButton.waitFor({state:'visible'});
await expect(saveButton).toBeEnabled();

await saveButton.click();

});



 });







