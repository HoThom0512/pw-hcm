
import {Page, expect} from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';


test (' Step 1 login to system', async({roleUserThom,page})=>{

 await test.step ('Step 2 navigate to My time',async()=>{
 await page.getByRole('link',{name:'My Time', exact:true}).click();
 await page.getByText('My Working Mode').click();

 //const rangePosition = page.locator('div.sc-inOpIg.hKFfGM');
 //await rangePosition.dragTo(rangePosition);


//locator của row AM
const rowAM = await page.locator('div.relative > div.row:nth-child(1) > div.box-empty').nth(1);
//locator của row PM
const rowPM = await page.locator('div.relative > div.row:nth-child(2) > div.box-empty').nth(30);

await rowAM.dragTo(rowPM)

const rowAMSelect = page.locator('div.row:nth-child(1) > div.box-select').nth(1);
const rowPMSelect = page.locator('div.row:nth-child(2) > div.box-select').nth(30);

// Chờ popup hiện ra
const popupOptionMode = page.locator('div[class*="box-wfh"]').first(); // 
await popupOptionMode.waitFor({state:'visible'});
//await page.waitForSelector('div.sc-ikOazj.jgRGDa'); // hoặc selector cụ thể cho khung chọn màu

// Click vào màu đại diện (ví dụ: màu xanh đầu tiên)
const wfhMode = await page.locator('div.sc-esuAPk.eIGJND.box-wfh ').nth(1); // ví dụ màu xanh
await wfhMode.waitFor({state:'visible'});
await expect(wfhMode).toBeEnabled();
await wfhMode.click();

//sau khi click mode wfh chờ mode hiển thị đã chọn bao gồm mode và boder status
//AM
const selectedRowAM = await page.locator('div.box-wfh[status="1"] div.style-border-by-status').nth(0);
//await page.waitForSelector('div.sc-gCNZBk.dMyFog.relative div.row .box-wfh');
await selectedRowAM.waitFor({state:'visible'});

//PM
const selectedRowPM = await page.locator('div.box-wfh[status="1"] div.style-border-by-status').nth(30);
await selectedRowPM.waitFor({state:'visible'});

// chờ Save button visible and enable

const saveButton = page.getByRole('button',{name:'Save'});
await saveButton.waitFor({state:'visible'});
await expect(saveButton).toBeEnabled();

await saveButton.click();

// tùy vào nút thực tế

});



 });







