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
        startDate: '2025-05-22',
        expectStartDate: '05/22/2025',
        endDate: '2025-06-01',
        expectEndDate: '06/01/2025',
        indexStartdate: 0,
        indexEnddate: 1,
      },
      {
        name: 'assessment',
        startDate: '2025-05-23',
        expectStartDate: '05/23/2025',
        endDate: '2025-06-02',
        expectEndDate: '06/02/2025',
        indexStartdate: 2,
        indexEnddate: 3,
      },
      {
        name: 'first_review',
        startDate: '2025-05-24',
        expectStartDate: '05/24/2025',
        endDate: '2025-06-03',
        expectEndDate: '06/03/2025',
        indexStartdate: 4,
        indexEnddate: 5,
      },
      {
        name: 'face_to_face_meeting',
        startDate: '2025-05-25',
        expectStartDate: '05/25/2025',
        endDate: '2025-06-04',
        expectEndDate: '06/04/2025',
        indexStartdate: 6,
        indexEnddate: 7,
      },
      {
        name: 'second_review',
        startDate: '2025-05-26',
        expectStartDate: '05/26/2025',
        endDate: '2025-06-05',
        expectEndDate: '06/05/2025',
        indexStartdate: 8,
        indexEnddate: 9,
      },
  
      {
        name: 'final_approval',
        startDate: '2025-05-27',
        expectStartDate: '05/27/2025',
        endDate: '2025-06-06',
        expectEndDate: '06/06/2025',
        indexStartdate: 10,
        indexEnddate: 11,
      },
      {
        name: 'result_announcement',
        startDate: '2025-05-28',
        expectStartDate: '05/28/2025',
        endDate: '2025-06-07',
        expectEndDate: '06/07/2025',
        indexStartdate: 12,
        indexEnddate: 13,
      },
      {
        name: 'employee_revision_requests',
        startDate: '2025-05-29',
        expectStartDate: '05/29/2025',
        endDate: '2025-06-08',
        expectEndDate: '06/08/2025',
        indexStartdate: 14,
        indexEnddate: 15,
      },
   ];

  
   async function selectDMY(page,dateMonY) 
   
   {
    const targetDate = new Date(dateMonY);
    const targetMonth = targetDate.toLocaleString('default',{month:'short'});
    const targetYear = targetDate.getFullYear();
    const day = targetDate.getDate();

    while(true){

    const currentMonth = await page.locator('.ant-picker-month-btn').textContent();
    const currentYear = await page.locator('.ant-picker-year-btn').textContent();

    

    if(currentMonth?.trim()===targetMonth&&currentYear?.trim()===String(targetYear)){
    
        break;

    }

    //If not current month click next button

    await page.locator('div.ant-picker-panel button.ant-picker-header-next-btn').nth(indexEndDate).click();
    await page.waitForTimeout(200);

    }

    await page.locator('.ant-picker-cell-in-view .ant-picker-cell-inner', { hasText: String(day) }).click();


   }










});
});