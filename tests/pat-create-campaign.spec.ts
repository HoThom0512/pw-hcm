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
});

 const stages = [
  { name: 'self_assessment', startDate: '2025-01-11', endDate: '2025-01-12' },
  { name: 'assessment', startDate: '2025-01-11', endDate: '2025-01-12' },
  { name: 'first_review', startDate: '2025-01-11', endDate: '2025-01-12' },
  { name: 'face_to_face_meeting', startDate: '2025-01-11', endDate: '2025-01-12' },
  { name: 'second_review', startDate: '2025-01-11', endDate: '2025-01-12'},
  { name: 'final_approval', startDate: '2025-01-11', endDate: '2025-01-12' },
  { name: 'result_announcement', startDate: '2025-01-11', endDate: '2025-01-12' },
  { name: 'employee_revision_requests', startDate: '2025-01-11', endDate: '2025-01-12' },
];

// Hàm hỗ trợ chọn ngày từ date picker
async function selectDateFromPicker(page, datePickerSelector, date) {
  const [year, month, day] = date.split('-');

  // Click vào ô input để mở date picker
  await page.locator(datePickerSelector).click();

  // Chọn năm
  await page.locator(`button.ant-picker-year-btn`).selectOption(year);

  // Chọn tháng (tháng thường đánh số từ 0-11)
  await page.locator(`button.ant-picker-month-btn`).selectOption(String(Number(month) - 1));

  // Chọn ngày
  await page.locator('div.ant-picker-cell-inner', { hasText: day }).click();
}

// Hàm cấu hình từng stage
async function configureStage(page, stage) {
  console.log(`Configuring stage: ${stage.name}`);

  // Tạo selector cho start date và end date dựa trên stage name
  const startDateSelector = `input[name="${stage.name}_start_date"]`;
  const endDateSelector = `input[name="${stage.name}_end_date"]`;

  // Chọn start date
  await selectDateFromPicker(page, startDateSelector, stage.startDate);

  // Chọn end date
  await selectDateFromPicker(page, endDateSelector, stage.endDate);

  console.log(`Configured ${stage.name} successfully.`);
}
