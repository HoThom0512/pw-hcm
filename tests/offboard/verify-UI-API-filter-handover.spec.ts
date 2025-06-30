
import {Page, expect} from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';
import { OverviewPage } from '../../src/pom/overview.page';
import { request } from '@playwright/test';



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
  await page.locator('input[type="Search"]').first().click();

  const dropdownMenu = page.locator('div.ant-select-dropdown');
  await dropdownMenu.waitFor({ state: 'visible' });

  await page.locator('div.ant-select-item[title="Handover"]').click();

 //1. call API to get data from response 

 // Step 2: Lấy access token từ localStorage
  const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
  console.log('Access token:', accessToken);

 const requestContext = await request.newContext({
baseURL: 'https://qa-nexthcm-api.banvien.com.vn',
extraHTTPHeaders: {

     Authorization: `Bearer ${accessToken}`,
}

 });
 const getListHandover = await requestContext.get(
  '/gatewayapp/bpm/resignation-requests?sort=&page=0&size=10&preload=employee%2Cmanager&status=handover&lwd_from=&lwd_to=&handover_due_date_from=&handover_due_date_to='
);
 
 const responseApiGetHandover = await getListHandover.json()
 const statusCode = responseApiGetHandover.code;
 //const dataDetailGetHandover = responseApiGetHandover.data.items;
 
 console.log('API response', responseApiGetHandover);
 await expect(statusCode).toBe("CODE_SUCCESS");
 const dataDetailGetHandover = responseApiGetHandover.data.items;

 //2. data  filter on UI
 //const handoverCell = page.locator('td.ant-table-cell', { hasText: /^Handover$/ });
const rows = page.locator('table tbody tr');

// Lọc các hàng có chứa cột "Handover"
const handoverRows = rows.filter({
  has: page.locator('td.ant-table-cell', { hasText: /^Handover$/ })
});

const countHandoverRows = await handoverRows.count();
console.log(`Số hàng có status là Handover: ${countHandoverRows}`);

//3. using for i to loop through
 
for (let i =0;i<countHandoverRows;i++){

    const cif = await rows.nth(i).locator('td').nth(2).textContent();
    
    const employees = await rows.nth(i).locator('td').nth(3).textContent();
    const managers = await rows.nth(i).locator('td').nth(4).textContent();

    const DataDetailGetHandover = dataDetailGetHandover[i];
    const expectedFullName = `${DataDetailGetHandover.user.first_name} ${DataDetailGetHandover.user.last_name}`;
  const expectedManagerName = DataDetailGetHandover.manager
    ? `${DataDetailGetHandover.manager.first_name} ${DataDetailGetHandover.manager.last_name}`
    : '';

  expect(cif?.trim()).toBe(DataDetailGetHandover.user.code);
  expect(employees?.trim()).toBe(expectedFullName);
  expect(managers?.trim()).toBe(expectedManagerName);
}


  });
});