import {Locator, Page,expect } from '@playwright/test';
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
          startDate: '2025-05-28',
          expectStartDate: '05/28/2025',
          endDate: '2025-06-01',
          expectEndDate: '06/01/2025',
        
        },
        {
          name: 'assessment',
          startDate: '2025-05-28',
          expectStartDate: '05/28/2025',
          endDate: '2025-06-02',
          expectEndDate: '06/02/2025',
          
        },
        {
          name: 'first_review',
          startDate: '2025-05-29',
          expectStartDate: '05/29/2025',
          endDate: '2025-06-03',
          expectEndDate: '06/03/2025',
         
        },
        {
          name: 'face_to_face_meeting',
          startDate: '2025-05-30',
          expectStartDate: '05/30/2025',
          endDate: '2025-06-04',
          expectEndDate: '06/04/2025',
          
        },
        {
          name: 'second_review',
          startDate: '2025-05-31',
          expectStartDate: '05/31/2025',
          endDate: '2025-06-05',
          expectEndDate: '06/05/2025',
         
        },
    
        {
          name: 'final_approval',
          startDate: '2025-05-31',
          expectStartDate: '05/31/2025',
          endDate: '2025-06-06',
          expectEndDate: '06/06/2025',
         
        },
        {
          name: 'result_announcement',
          startDate: '2025-05-31',
          expectStartDate: '05/31/2025',
          endDate: '2025-06-07',
          expectEndDate: '06/07/2025',
        
        },
        {
          name: 'employee_revision_requests',
          startDate: '2025-05-31',
          expectStartDate: '05/31/2025',
          endDate: '2025-06-08',
          expectEndDate: '06/08/2025',
        
        },
     ];
      
    
     for(const StageCamPaign of stageCamPaign )
     {
    
     await selectStartDateEndDate(
      page,StageCamPaign.name, StageCamPaign.startDate, StageCamPaign.endDate, 
      StageCamPaign.expectStartDate,StageCamPaign.expectEndDate)
    
    }
    await page.getByRole('button',{name:'Next'}).click();
    await page.getByRole('button',{name:'Finish'}).click();
    
       
    /*function select start date/end date
    
    1. click on input field to open date picker
    2. wait pop up date picker visible
    3. click next button to select date
    4. wait pop up date picker visible 
    5. select date/year
    6. assert expected value 
     */
    
     
    async function selectStartDateEndDate(page,nameStage,startDate,endDate
    ,expectStartDate,expectedEnddate) {
    
      ///Select Start Date 
      //1. click on input field to open date picker
     //const inputStart= page.locator(input[name="${nameStage}_start_date"]);
     //await inputStart.click();
    
    
    
    await page.locator(`input[name="${nameStage}_start_date"]`).click();
    const popupStartDate = page.locator('div.ant-picker-panel:visible');
    await popupStartDate.waitFor({ state: 'visible' });
    
    
    
     //2. wait pop up date picker visible
     //const startDatePopup = page.locator('div.ant-picker-panel').filter({has:inputStart});
     //await page.locator('div.ant-picker-panel:visible').waitFor({ state: 'visible' });
    await selectDMY(page,popupStartDate,startDate)
     //3. click next button to select date
     //await popup.locator('div.ant-picker-header > button.ant-picker-header-next-btn').click();
    
     //4. wait pop up date picker visible
     //await popup.waitFor({ state: 'visible' });
     // 5. select startdate
    const selectedStartDate = page.locator(`input[title="${expectStartDate}"][name="${nameStage}_start_date"]`);
    //await popup.locator(`td[title="${startDate}"] div.ant-picker-cell-inner`).click();
    await expect(selectedStartDate).toHaveValue(`${expectStartDate}`);
    
    ///Select End Date 
    
    //5. click on input field to open date picker
    await page.locator(`input[name="${nameStage}_end_date"]`).click();
    const popupEnd = page.locator('div.ant-picker-panel:visible');
    await popupEnd.waitFor({ state: 'visible' });
    
    
    //6. wait pop up date picker visible
    //const endDatePopup = page.locator('div.ant-picker-panel');
    //await popupEnd.waitFor({state:'visible'});
    
    await selectDMY(page,popupEnd,endDate)
    //7. click next button to select date
    //await popupEnd.locator('div.ant-picker-header > button.ant-picker-header-next-btn').click();
    
    //8. wait pop up date picker visible
    //await popupEnd.waitFor({ state: 'visible' });
    
    
    // 9. select enddate
    const selectedEndDate = page.locator(`input[title="${expectedEnddate}"][name="${nameStage}_end_date"]`);
    //await popupEnd.locator(`td[title="${endDate}"] div.ant-picker-cell-inner`).click();
    await expect(selectedEndDate).toHaveValue(`${expectedEnddate}`);
    
    //await page.getByRole('button',{name:'Next'}).click();
    //await page.getByRole('button',{name:'Finish'}).click();
    
    
     }


async function selectDMY(page: Page, popup: Locator, targetDateStr: string) {
  const targetDate = new Date(targetDateStr);
  const targetMonth = targetDate.getMonth(); // 0-based
  const targetYear = targetDate.getFullYear();

  const getCurrentMonthYear = async () => {
    const currentMonthStr = (await popup.locator('button.ant-picker-month-btn').textContent())?.trim() || '';
    const currentYearStr = (await popup.locator('button.ant-picker-year-btn').textContent())?.trim() || '';
    const currentMonth = new Date(`${currentMonthStr} 1, 2000`).getMonth();
    const currentYear = parseInt(currentYearStr, 10);
    return { currentMonth, currentYear, currentMonthStr, currentYearStr };
  };

  let count = 0;
  const maxLoops = 12;

  while (count++ < maxLoops) {
    const { currentMonth, currentYear, currentMonthStr } = await getCurrentMonthYear();

    console.log(`Loop ${count} | Current: Month=${currentMonthStr} (${currentMonth}) Year=${currentYear} | Target: Month=${targetMonth} Year=${targetYear}`);

    if (currentMonth === targetMonth && currentYear === targetYear) {
      break;
    }

    // Tính khoảng cách giữa target và current (theo tháng)
    const currentTotalMonths = currentYear * 12 + currentMonth;
    const targetTotalMonths = targetYear * 12 + targetMonth;
    const diff = targetTotalMonths - currentTotalMonths;

    const navButton = diff > 0
      ? popup.locator('button.ant-picker-header-next-btn').first()
      : popup.locator('button.ant-picker-header-prev-btn').first();

    const monthBtn = popup.locator('button.ant-picker-month-btn');
    const prevMonthText = await monthBtn.textContent();

    await expect(navButton).toBeEnabled();

    await navButton.click({force:true});
    console.log(`➡️ Click ${diff > 0 ? 'next' : 'prev'} month button`);


    // Chờ tháng thay đổi
    await expect(monthBtn).not.toHaveText(prevMonthText || '', { timeout: 3000 });

    await expect(popup).toBeVisible();
  }

  const { currentMonth, currentYear } = await getCurrentMonthYear();
  if (currentMonth !== targetMonth || currentYear !== targetYear) {
    throw new Error(`Không thể điều hướng tới tháng/năm: ${targetMonth + 1}/${targetYear} sau ${maxLoops} lần lặp.`);
  }

  await popup.locator(`td[title="${targetDateStr}"] div.ant-picker-cell-inner`).click();
}
 });
});