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

  
  const stageCamPaign = [
    {
      name: 'self_assessment',
      startDate: '2025-05-17',
      expectStartDate: '05/17/2025',
      endDate: '2025-06-01',
      expectEndDate: '06/01/2025',
      indexStartdate: 0,
      indexEnddate: 1,
    },
    {
      name: 'assessment',
      startDate: '2025-05-18',
      expectStartDate: '05/18/2025',
      endDate: '2025-06-02',
      expectEndDate: '06/02/2025',
      indexStartdate: 2,
      indexEnddate: 3,
    },
    {
      name: 'first_review',
      startDate: '2025-05-19',
      expectStartDate: '05/19/2025',
      endDate: '2025-06-03',
      expectEndDate: '06/03/2025',
      indexStartdate: 4,
      indexEnddate: 5,
    },
    {
      name: 'face_to_face_meeting',
      startDate: '2025-05-19',
      expectStartDate: '05/19/2025',
      endDate: '2025-06-04',
      expectEndDate: '06/04/2025',
      indexStartdate: 6,
      indexEnddate: 7,
    },
    {
      name: 'second_review',
      startDate: '2025-05-20',
      expectStartDate: '05/20/2025',
      endDate: '2025-06-05',
      expectEndDate: '06/05/2025',
      indexStartdate: 8,
      indexEnddate: 9,
    },
    {
      name: 'final_approval',
      startDate: '2025-05-21',
      expectStartDate: '05/21/2025',
      endDate: '2025-06-06',
      expectEndDate: '06/06/2025',
      indexStartdate: 10,
      indexEnddate: 11,
    },
    {
      name: 'result_announcement',
      startDate: '2025-05-22',
      expectStartDate: '05/22/2025',
      endDate: '2025-06-07',
      expectEndDate: '06/07/2025',
      indexStartdate: 12,
      indexEnddate: 13,
    },
    {
      name: 'employee_revision_requests',
      startDate: '2025-05-23',
      expectStartDate: '05/23/2025',
      endDate: '2025-06-08',
      expectEndDate: '06/08/2025',
      indexStartdate: 14,
      indexEnddate: 15,
    },
  ];
  
 // === MAIN LOOP ===
for (const stage of stageCamPaign) {
  await selectStartDateEndDate(
    page,
    stage.name,
    stage.startDate,
    stage.endDate,
    stage.indexStartdate,
    stage.indexEnddate,
    stage.expectStartDate,
    stage.expectEndDate,
    
  );
}

await page.getByRole('button', { name: 'Next' }).click();
await page.getByRole('button', { name: 'Finish' }).click();


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
   //const startDatePopup = page.locator('div.ant-picker-panel');
   //await startDatePopup.nth(indexStartDate).waitFor({state:'visible'});
  
   //3. click next button to select date
   // await page.locator('div.ant-picker-panel button.ant-picker-header-next-btn').nth(indexStartDate).click();
  
   //4. wait pop up date picker visible
   //await startDatePopup.nth(indexStartDate).waitFor({state:'visible'});
  
   // 5. select startdate
   await selectDMY(page,startDate,indexStartDate)
   const selectedStartDate = page.locator(`input[title="${expectStartDate}"][name="${nameStage}_start_date"]`);
  //await page.locator(`td[title="${startDate}"] div.ant-picker-cell-inner`).nth(indexStartDate).click();
  await expect(selectedStartDate).toHaveValue(`${expectStartDate}`);
  
  ///Select End Date 
  
  //5. click on input field to open date picker
  await page.locator(`input[name="${nameStage}_end_date"]`).click();
  
  //6. wait pop up date picker visible
  //const endDatePopup = page.locator('div.ant-picker-panel');
  //await endDatePopup.nth(indexEndDate).waitFor({state:'visible'});
  
  //7. click next button to select date
   //await page.locator('div.ant-picker-panel button.ant-picker-header-next-btn').nth(indexEndDate).click();
  
  //8. wait pop up date picker visible
  //await endDatePopup.nth(indexEndDate).waitFor({state:'visible'});
  
  // 9. select enddate
  await selectDMY(page,endDate,indexEndDate)
  const selectedEndDate = page.locator(`input[title="${expectedEnddate}"][name="${nameStage}_end_date"]`);
  //await page.locator(`td[title="${endDate}"] div.ant-picker-cell-inner`).nth(indexEndDate).click();
  await expect(selectedEndDate).toHaveValue(`${expectedEnddate}`);
  
  //await page.getByRole('button',{name:'Next'}).click();
  //await page.getByRole('button',{name:'Finish'}).click();

// ========== selectDMY FUNCTION ==========
async function selectDMY(page: Page, targetDateStr: string, indexTarget: number) {
  const targetDate = new Date(targetDateStr);
  const targetMonth = targetDate.toLocaleString('default', { month: 'short' });
  const targetYear = targetDate.getFullYear().toString();

  const popupDatePicker = page.locator('div.ant-picker-panel');
  let attempts = 0;

  while (true) {
    const currentMonth = await page.locator('button.ant-picker-month-btn').nth(indexTarget).textContent();
    const currentYear = await page.locator('button.ant-picker-year-btn').nth(indexTarget).textContent();

    console.log(`[LOG] Current panel: ${currentMonth?.trim()} ${currentYear?.trim()}`);
    console.log(`[LOG] Target: ${targetMonth} ${targetYear}`);

    if (currentMonth?.trim() === targetMonth && currentYear?.trim() === targetYear) {
      break;
    }

    if (attempts++ > 12) {
      throw new Error('Exceeded max attempts (12) while navigating calendar');
    }

    // Wait and click next month
    const datePanel = page.locator('div.ant-picker-panel');
    await datePanel.nth(indexTarget).waitFor({ state: 'visible' });
    await page.locator('div.ant-picker-panel button.ant-picker-header-next-btn').nth(indexTarget).click();
    await page.waitForTimeout(200);
  }

  // Sau khi đến đúng tháng/năm
  const dateCells = page.locator(`td[title="${targetDateStr}"] div.ant-picker-cell-inner`);
  const cellCount = await dateCells.count();

  console.log(`[LOG] Found ${cellCount} cells for date ${targetDateStr}, using index ${indexTarget}`);

  if (cellCount === 0) {
    throw new Error(`❌ No cells found for date ${targetDateStr}`);
  }

  if (indexTarget >= cellCount) {
    throw new Error(`❌ indexTarget (${indexTarget}) exceeds available cell count (${cellCount}) for date ${targetDateStr}`);
  }

  await dateCells.nth(indexTarget).waitFor({ state: 'visible', timeout: 5000 });
  await dateCells.nth(indexTarget).click();

  // Optional: Wait for popup to close if needed
  // await expect(popupDatePicker.nth(indexTarget)).toBeHidden({ timeout: 1000 });
}
  }
  });
});