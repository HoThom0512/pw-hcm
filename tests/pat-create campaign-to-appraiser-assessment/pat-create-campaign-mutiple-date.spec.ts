import { Page,expect } from '@playwright/test';
import { time } from 'console';
import { start } from 'repl';
import { test } from '../../src/fixture/index.fixture';



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

  
  const stageCamPaign= [
    {
      name: 'self_assessment',
      startDate: '2025-05-15',
      expectStartDate: '05/15/2025',
      endDate: '2025-05-17',
      expectEndDate: '05/17/2025',
      indexStartdate: 0,
      indexEnddate: 1,
    },
    {
      name: 'assessment',
      startDate: '2025-05-16',
      expectStartDate: '05/16/2025',
      endDate: '2025-05-19',
      expectEndDate: '05/19/2025',
      indexStartdate: 2,
      indexEnddate: 3,
    },
    {
      name: 'first_review',
      startDate: '2025-05-18',
      expectStartDate: '05/18/2025',
      endDate: '2025-05-20',
      expectEndDate: '05/20/2025',
      indexStartdate: 4,
      indexEnddate: 5,
    },
    {
      name: 'face_to_face_meeting',
      startDate: '2025-05-19',
      expectStartDate: '05/19/2025',
      endDate: '2025-05-21',
      expectEndDate: '05/21/2025',
      indexStartdate: 6,
      indexEnddate: 7,
    },
    {
      name: 'second_review',
      startDate: '2025-05-20',
      expectStartDate: '05/20/2025',
      endDate: '2025-05-22',
      expectEndDate: '05/22/2025',
      indexStartdate: 8,
      indexEnddate: 9,
    },

    {
      name: 'final_approval',
      startDate: '2025-05-21',
      expectStartDate: '05/21/2025',
      endDate: '2025-05-24',
      expectEndDate: '05/24/2025',
      indexStartdate: 10,
      indexEnddate: 11,
    },
    {
      name: 'result_announcement',
      startDate: '2025-05-22',
      expectStartDate: '05/22/2025',
      endDate: '2025-05-26',
      expectEndDate: '05/26/2025',
      indexStartdate: 12,
      indexEnddate: 13,
    },
    {
      name: 'employee_revision_requests',
      startDate: '2025-05-23',
      expectStartDate: '05/23/2025',
      endDate: '2025-05-28',
      expectEndDate: '05/28/2025',
      indexStartdate: 14,
      indexEnddate: 15,
    },
 ];
  

 for(const StageCamPaign of stageCamPaign )
 {

 await selectStartDateEndDate(
  page,StageCamPaign.name, StageCamPaign.startDate, StageCamPaign.endDate, 
  StageCamPaign.indexStartdate, StageCamPaign.indexEnddate, 
  StageCamPaign.expectStartDate,StageCamPaign.expectEndDate)

}
await page.getByRole('button',{name:'Next'}).click();
await page.getByRole('button',{name:'Finish'}).click();

 });
 



/*function select start date/end date

1. click on input field to open date picker
2. wait pop up date picker visible
3. click next button to select date
4. wait pop up date picker visible 
5. select date/year
6. assert expected value 
 */

 
async function selectStartDateEndDate(page,nameStage,startDate,endDate
,indexStartDate,indexEndDate,expectStartDate,expectedEnddate) {

  ///Select Start Date 
  //1. click on input field to open date picker
 await page.locator(`input[name="${nameStage}_start_date"]`).click();

 //2. wait pop up date picker visible
 const startDatePopup = page.locator('div.ant-picker-panel');
 await startDatePopup.nth(indexStartDate).waitFor({state:'visible'});

 //3. click next button to select date
 // await page.locator('div.ant-picker-panel button.ant-picker-header-next-btn').nth(indexStartDate).click();

 //4. wait pop up date picker visible
 //await startDatePopup.nth(indexStartDate).waitFor({state:'visible'});

 // 5. select startdate
const selectedStartDate = page.locator(`input[title="${expectStartDate}"][name="${nameStage}_start_date"]`);
await page.locator(`td[title="${startDate}"] div.ant-picker-cell-inner`).nth(indexStartDate).click();
await expect(selectedStartDate).toHaveValue(`${expectStartDate}`);

///Select End Date 

//5. click on input field to open date picker
await page.locator(`input[name="${nameStage}_end_date"]`).click();

//6. wait pop up date picker visible
const endDatePopup = page.locator('div.ant-picker-panel');
await endDatePopup.nth(indexEndDate).waitFor({state:'visible'});

//7. click next button to select date
 //await page.locator('div.ant-picker-panel button.ant-picker-header-next-btn').nth(indexEndDate).click();

//8. wait pop up date picker visible
//await endDatePopup.nth(indexEndDate).waitFor({state:'visible'});

// 9. select enddate
const selectedEndDate = page.locator(`input[title="${expectedEnddate}"][name="${nameStage}_end_date"]`);
await page.locator(`td[title="${endDate}"] div.ant-picker-cell-inner`).nth(indexEndDate).click();
await expect(selectedEndDate).toHaveValue(`${expectedEnddate}`);

//await page.getByRole('button',{name:'Next'}).click();
//await page.getByRole('button',{name:'Finish'}).click();


 }


});




