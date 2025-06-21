import {Locator, Page,expect } from '@playwright/test';
import { time } from 'console';
import { start } from 'repl';
import { test } from '../../src/fixture/index.fixture';



test('step 1 login on HCM system', async({overviewpage,page}) =>{
  
  await test.step('Step 2 Navigate to Admin menu then click on PA ', async() =>{
  await page.getByText('Admin').click();
  const PA= page.getByText('Performance Assessment').nth(0);
  await PA.scrollIntoViewIfNeeded();

  //await expect(page).toHaveTitle('Performance Assessment');
  await PA.click({force:true});
  
});
 await test.step('Step 3 click on Add New Button', async() => {
  await page.locator('text= New Campaign').waitFor({ state: 'visible' , timeout: 60000});
  await page.locator('text= New Campaign').click();
  await expect(page.locator('text = Create Campaign')).toBeVisible();
 });

  await test.step('Step 4 fill general infor valid on all require field', async () => {

  const department = ['CS Department', 'OD Department', 'SD Department', 'ES Department'];
  await page.locator('input[name="name"]').fill("Automation create");

  const dropdownSearch = page.locator('div[class="ant-select-selection-overflow"]');
  await dropdownSearch.click();
  await expect(page.locator('div[class="rc-virtual-list-holder-inner"]')).toHaveClass;

//Select DP participate campaign 
  for (const Department of department) {
    //wait for value in droplist to visible 
    const departmentLocator = page.locator(`div[title="${Department}"]`);
    console.log(`Selecting ${Department}`);
    await expect(departmentLocator).toBeVisible({ timeout: 10000 });
    
    // click on value
    await departmentLocator.click();
    const selectedDepartment = await dropdownSearch.textContent();
    expect(selectedDepartment).toContain(Department);
  }
  await page.getByRole('button',{name: 'Next',exact:true}).click();
});

 await test.step ('tep 5 fill all require field valid in Milestone Settings',async () => {

  
      // Hàm chọn ngày trong Ant Design DatePicker
async function pickDate(fieldName, offsetDays) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + offsetDays);

  const day = targetDate.getDate();
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const dateStr = `${targetDate.getFullYear()}-${month}-${day.toString().padStart(2, '0')}`;

  const input = page.locator(`input[name="${fieldName}"]`);
  await input.scrollIntoViewIfNeeded();
  await input.click();

  const popup = page.locator('div.ant-picker-panel:visible');
  await expect(popup).toBeVisible();

  const titleD = popup.locator(`td[title="${dateStr}"] div.ant-picker-cell-inner`);
  await titleD.waitFor({state: 'visible'});
  await expect(titleD).toBeEnabled();
  await titleD.click();

   // ✅ Đợi panel biến mất để tránh đụng panel cũ
  await expect(popup).toHaveCount(0, { timeout: 5000 });
}
    /// Stage 1: Self Assessment (3 ngày)
await pickDate('self_assessment_start_date', 1);   // ngày mai
await pickDate('self_assessment_end_date', 3);     // 3 ngày sau

// Stage 2: Assessment (4 - 6 ngày)
await pickDate('assessment_start_date', 4);
await pickDate('assessment_end_date', 6);


// Stage 3: F2F (7 - 9 ngày)
await pickDate('first_review_start_date', 7);
await pickDate('first_review_end_date', 9);

// Stage 4: F2F (7 - 9 ngày)
await pickDate('face_to_face_meeting_start_date', 7);
await pickDate('face_to_face_meeting_end_date', 9);

// Stage 5: F2F (7 - 9 ngày)
await pickDate('second_review_start_date', 7);
await pickDate('second_review_end_date', 9);

// Stage 6: F2F (7 - 9 ngày)
await pickDate('final_approval_start_date', 7);
await pickDate('final_approval_end_date', 9);

// Stage 7: F2F (7 - 9 ngày)
await pickDate('result_announcement_start_date', 7);
await pickDate('result_announcement_end_date', 9);

// Stage 8: F2F (7 - 9 ngày)
await pickDate('employee_revision_requests_start_date', 7);
await pickDate('employee_revision_requests_end_date', 9);

 });
});