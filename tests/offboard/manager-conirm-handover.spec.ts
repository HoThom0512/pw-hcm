import {Page, expect} from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';
import { OverviewPage } from '../../src/pom/overview.page';


test('step 1 login on HCM system', async({overviewpage,page}) =>{
  
  await test.step('Step 2 Navigate to Admin menu then click on PA ', async() =>{
  await page.locator('text = Admin').click();
  
  // verify to visible the RM
  const itemRequest = page.getByText('Request Management').first();
  await itemRequest.scrollIntoViewIfNeeded();
  await expect(itemRequest).toBeVisible();

  await itemRequest.click();
  await expect(page).toHaveURL('https://qa-nexthcm.banvien.com.vn/admin/request-management/onboarding-process/overview');

  await page.getByText('Resignation Request').click();

  await expect(page).toHaveURL('https://qa-nexthcm.banvien.com.vn/admin/request-management/resignation-request');

 //filter status handover

 const [responseGet] = await Promise.all([
  // Chờ API gọi đúng status=handover
  page.waitForResponse((res) =>
    res.url().includes('/resignation-requests') &&
    res.url().includes('status=handover')
  ),

  // Thao tác UI để mở dropdown và chọn "Handover"
  (async () => {
    await page.locator('input[type="Search"]').first().click();

    const dropdownMenu = page.locator('div.ant-select-dropdown');
    await dropdownMenu.waitFor({ state: 'visible' });

    await page.locator('div.ant-select-item[title="Handover"]').click();
  }) ()
]);

// Parse response JSON
const convertRespGet = await responseGet.json();
const expectedRowCount = convertRespGet.data.items.length;
console.log('API trả về:', convertRespGet);

const apiCount = convertRespGet.data.items.length;

// Lọc đúng các dòng có <td> (tức là dòng dữ liệu thật)
const rowLocator = page.locator('table tbody tr').filter({
  has: page.locator('td')
});
await expect(rowLocator).toHaveCount(expectedRowCount);
  })
});