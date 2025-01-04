import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';

// Step 1: login page
test('create campaign', async ({ overviewpage, page }) => {

  // data test
  const department = ['CS Department', 'OD Department', 'SD Department', 'ES Department'];

  // Step 2: Navigate to Performance Assessment
  await page.locator('text = Admin').click();
  await expect(page.locator('a[href="/admin/performance-assessment"]')).toBeVisible();
  await page.locator('text = Performance Assessment').click();

  // Step 3: click add new button
  await page.locator('button[class="ant-btn ant-btn-default sc-egkSDF jnzsNw"]').click();
  await expect(page.locator('div[class="sc-gYmPdZ dGDzHA"]')).toBeVisible();

  // Step 4: input value valid all field 
  await page.locator('input[name="name"]').fill("Automation create");

  //Step 5: click on modal selectbox 
  const dropdown = page.locator('div[class="ant-select-selection-overflow"]');
  await dropdown.click();
  await expect(page.locator('div[class="rc-virtual-list-holder-inner"]')).toBeVisible();



  // Step 6: open select dropdown and verify options
  for (const Department of department) {
    const departmentLocator = page.locator(`div[title="${Department}"]`);
    console.log(`Selecting ${Department}`);
    
    // Wait for the department item to be visible and clickable
    await expect(departmentLocator).toBeVisible({ timeout: 10000 });
    
    // Click on the department item to select
    await departmentLocator.click();

    // Optionally, verify that the department was selected in the dropdown
    const selectedDepartment = await dropdown.textContent();
    expect(selectedDepartment).toContain(Department);
  }

  // Finalize the action by clicking the save button
  await page.locator('button[class="ant-btn ant-btn-default sc-egkSDF knBkRw"]').click();

 //Step 7 select date for each stage 
 //7.1 self Assesment, viết các hàm sử dụng chung cho all stage 
 //hàm async
 //const openDatePiker = await page.locator('input[placeholder="Select date"]');
 //await openDatePiker.click();

// hàm chọn year
const selectYear = async (page,year) => {
  await page.locator('.ant-picker-year-btn').click();
  await page.locator(`button:has-text("${year}")`).click();
};

 
//hàm chọn month
const selectMonth = async(page, month)=> {
await page.locator('.ant-picker-year-btn').click();
await page.locator(`button:has-text("${month}")`);
};

//hàm select date
const selectDate = async (page, date) => {
  await page.locator(`.ant-picker-cell[title="${date}"] .ant-picker-cell-inner`).click();
};
const selectDatePicker = async(page, selectYear,selectMonth,selectDate)=>{
  await selectYear(page,selectYear);
  await selectMonth(page,selectMonth);
  await selectDate(page,selectDate);

};
//step 8 fill date time to stage selfAssesment
await page.locator('input[name="self_assessment_start_date"]').click();
await selectDatePicker(page,'20205','Jan','2025-01-06');
await page.locator('input[name="self_assessment_end_date"]').click();
await selectDatePicker(page,'20205','Jan','2025-01-07');

});
