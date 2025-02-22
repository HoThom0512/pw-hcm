import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';



test('step 1 login on HCM system', async({overviewpage,page}) =>{
  
  await test.step('Step 2 Navigate to Admin menu then click on PA ', async() =>{
  await page.locator('text = Admin').click();
  });
  await expect(page.locator('a[href="/admin/performance-assessment"]')).toBeVisible();
  await page.locator('text = Performance Assessment').click();
});
/*
 await test.step('Step 3 click on Add New Button', async() => {
  await page.locator('text= New Campaign').waitFor({ state: 'visible' , timeout: 60000});
  await page.locator('text= New Campaign').click();
  await expect(page.locator('text = Create Campaign')).toBeVisible();
 });

  await test.step('Step 4 fill general infor valid on all require field', async () => {

  const department = ['CS Department', 'OD Department', 'SD Department', 'ES Department'];
  await page.locator('input[name="name"]').fill("Automation create");

  const dropdown = page.locator('div[class="ant-select-selection-overflow"]');

  await dropdown.click();
  await expect(page.locator('div[class="rc-virtual-list-holder-inner"]')).toHaveClass;


  for (const Department of department) {
    const departmentLocator = page.locator(`div[title="${Department}"]`);
    console.log(`Selecting ${Department}`);
    await expect(departmentLocator).toBeVisible({ timeout: 10000 });
    
    await departmentLocator.click();
    const selectedDepartment = await dropdown.textContent();
    expect(selectedDepartment).toContain(Department);
  }
  await page.locator('button[class="ant-btn ant-btn-default sc-egkSDF knBkRw"]').click();
});

 await test.step ('tep 5 fill all require field valid in Milestone Settings',async () => {

  //const datePickerPopUp = ".ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft";
  
  const stageRange = [
    {
      name: 'self_assessment',
      startDate: '2025-01-13',
      endDate: '2025-01-14',
    },
    {
      name: 'assessment',
      startDate: '2025-01-13',
      endDate: '2025-01-13',
    },
    {
      name: 'first_review',
      startDate: '2025-01-13',
      endDate: '2025-01-13',
    },
    {
      name: 'face_to_face_meeting',
      startDate: '2025-01-13',
      endDate: '2025-01-14',
    },
    {
      name: 'second_review',
      startDate: '2025-01-13',
      endDate: '2025-01-14',
    },

    {
      name: 'final_approval',
      startDate: '2025-01-13',
      endDate: '2025-01-14',
    },
    {
      name: 'result_announcement',
      startDate: '2025-01-13',
      endDate: '2025-01-14',
    },
    {
      name: 'employee_revision_requests',
      startDate: '2025-01-13',
      endDate: '2025-01-14',
    },
 ];
  
  for (const StageRange  of stageRange ) {
    console.log(`Processing: ${StageRange.name}`);

    await selectDate(`${StageRange.name}_start_date`, StageRange.startDate);
    await page.waitForTimeout(1000);
    // Click end date
    await selectDate(`${StageRange.name}_end_date`, StageRange.endDate);
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
=======
 });
  // Hàm chọn ngày từ date picker
async function selectDate(inputName, date) {
  const inputLocator = page.locator(`input[name="${inputName}"]`);

  // Click vào input để mở date picker
  await inputLocator.click({ timeout: 60000 });

  // Đợi date picker xuất hiện
  const datePicker = page.locator('div[class="ant-picker-dropdown style-range-picker-popover popup-date-picker en ant-picker-dropdown-placement-bottomLeft "]');
  await datePicker.waitFor({ state: 'visible', timeout: 60000 });
  await datePicker.waitFor({ state: 'attached', timeout: 60000 });
  // Chọn ngày cụ thể trong date picker
  const dateLocator = page.locator(`td[title="${date}"].ant-picker-cell-in-view`).first();
  const isVisible = await dateLocator.isVisible();
  if (isVisible) {
    await dateLocator.click({ timeout: 60000 });
    console.log('Date selected!');
  } else {
    console.log('Date is not visible!');
  }
  
  //await dateLocator.waitFor({ state: 'visible', timeout: 90000 });

  await dateLocator.scrollIntoViewIfNeeded({ timeout: 90000});

  //await dateLocator.waitFor({ state: 'visible', timeout: 60000 });

 // await dateLocator.click({ timeout: 90000, force: true });

  console.log(`Selected date ${date} for ${inputName}`);

  }

await test.step('step 6 click next button',async()=>{ 
await page.locator('text= Next').click({timeout:60000});

});

await test.step('Step 7 click finish button', async()=>{
await expect(page.locator('text=Participants Adjustment')).toBeVisible();
await page.locator('text=Finish').click();
 
});
});*/

