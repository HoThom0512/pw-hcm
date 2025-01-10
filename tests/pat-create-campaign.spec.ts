import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';



test('step 1 login on HCM system', async({overviewpage,page}) =>{
  
 await test.step('Step 2 Navigate to Admin menu then click on PA ', async() =>{

  await page.locator('text = Admin').click();
  await expect(page.locator('a[href="/admin/performance-assessment"]')).toBeVisible();
  await page.locator('text = Performance Assessment').click();
});

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
  await expect(page.locator('div[class="rc-virtual-list-holder-inner"]')).toBeVisible();


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
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },
    {
      name: 'assessment',
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },
    {
      name: 'first_review',
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },
    {
      name: 'face_to_face_meeting',
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },
    {
      name: 'second_review',
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },

    {
      name: 'final_approval',
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },
    {
      name: 'result_announcement',
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },
    {
      name: 'employee_revision_requests',
      startDate: '2025-01-09',
      endDate: '2025-01-10',
      datePickers: [
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft',
        '.ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft'
      ]
    },
 ];
  


 const selectDate = async (name, date, datePickerLocator,index) => {
  const dateInputLocator = page.locator(`input[name="${name}"]`);
  await dateInputLocator.click({ timeout: 60000 });

  const datePickerPopupLocator = page.locator(datePickerLocator).nth(index); // Use nth(index) to target the correct date picker
  await expect(datePickerPopupLocator).toBeVisible({ timeout: 15000 });

  // Chọn ngày từ popup
  const dateElementLocator = page.locator(`td[title="${date}"]:visible`).first();
  await expect(dateElementLocator).toBeVisible({ timeout: 10000 });

  // Scroll và click vào ngày
  //await dateElementLocator.scrollIntoViewIfNeeded({ timeout: 10000 });
  //await dateElementLocator.click({ timeout: 10000 });

};

for (const { name, startDate, endDate, datePickers } of stageRange) {
  // Chọn start date cho stage
  await selectDate(`${name}_start_date`, startDate, datePickers[0],0);

  // Chọn end date cho stage
  await selectDate(`${name}_end_date`, endDate, datePickers[1],1);
}
});

//await expect(startSelectDate).toBe(startSelectDate);
//await expect(endSelectDate).toBe(endSelectDate);


await test.step('step 6 click next button',async()=>{ 
await page.locator('text= Next').click({timeout:60000});

});

await test.step('Step 7 click finish button', async()=>{
await expect(page.locator('text=Participants Adjustment')).toBeVisible();
await page.locator('text=Finish').click();
 
});

 });