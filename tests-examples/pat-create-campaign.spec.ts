import { Page,expect } from '@playwright/test';
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

  const dropdownSearch = page.locator('div[class="ant-select-selection-overflow"]');
  await dropdownSearch.click();
  await expect(page.locator('div[class="rc-virtual-list-holder-inner"]')).toHaveClass;


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

  //const datePickerPopUp = ".ant-picker-dropdown.style-range-picker-popover.popup-date-picker.en.ant-picker-dropdown-placement-bottomLeft";
  /*
  const stageRange = [
    {
      name: 'self_assessment',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },
    {
      name: 'assessment',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },
    {
      name: 'first_review',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },
    {
      name: 'face_to_face_meeting',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },
    {
      name: 'second_review',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },

    {
      name: 'final_approval',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },
    {
      name: 'result_announcement',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },
    {
      name: 'employee_revision_requests',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
    },
 ];
  

*/

/*stage 1 

select start date

1. click on date picker : input[name="self_assessment_start_date"]
2. verify popup visible : div.ant-picker-panel
3. click next : button.ant-picker-header-next-btn
4. select start date


select end date

1. click on date picker : input[name="self_assessment_end_date"]
2. verify popup visible : div.ant-picker-panel
3. click next : button.ant-picker-header-next-btn
4. select start date

 /*
  for (const StageRange of stageRange ) {
    console.log(`Processing: ${StageRange.name}`);

    await selectDate(`${StageRange.name}_start_date`, StageRange.startDate);
    await page.waitForTimeout(1000);
    // Click end date
    await selectDate(`${StageRange.name}_end_date`, StageRange.endDate);
  }

*/

//Select startdate
await page.locator('input[name="self_assessment_start_date"]').click();

const startDatePicker = page.locator('div.ant-picker-panel')
await startDatePicker.waitFor({state:'visible'});
await page.locator('button.ant-picker-header-next-btn').click();
await startDatePicker.fill('2025-05-01');
const selectedStartDate = page.locator('input[title="05/01/2025"][name="self_assessment_start_date"]')
await expect(selectedStartDate).toHaveText('05/01/2025');

//select end date

await page.locator('input[name="self_assessment_end_date"]').click();

const endDatePicker = page.locator('div.ant-picker-panel')
await endDatePicker.waitFor({state:'visible'});
await page.locator('button.ant-picker-header-next-btn').click();
await endDatePicker.fill('2025-05-01');
const selectedEndDate = page.locator('input[title="05/01/2025"][name="self_assessment_end_date"]')
await expect(selectedEndDate).toHaveText('05/01/2025');



 });
});