import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';


test('step 1 login on HCM system', async({apuseroverviewpage,page}) => {
  
    await test.step('Step 2 Navigate Performance Assessment', async() =>{
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Performance Assessment' }).click();
    await page.getByRole('row', { name: 'Test ES Department SD' }).getByRole('img').nth(1).click();
    await page.getByText('Assessment Details').click();
    await page.getByRole('textbox', { name: 'Search by name...' }).fill('Oanh');
    await page.getByRole('row', { name: '1503002 TRUONG THI KIM OANH' }).getByRole('img').nth(2).click();

    });
   await test.step('step 3 appraiser fill score for employee', async()=>{

    
  const selectScore =[
  {idDropdown:'[id="demo-select-performances\\.0\\.score"]', 
  locatorValue: page=> page.locator('[id="demo-select-performances\\.0\\.score"]').getByText('1', { exact: true }),
  },

  {idDropdown:'[id="demo-select-performances\\.2\\.score"]', 
  locatorValue: page => page.locator('[id="demo-select-performances\\.2\\.score"]').getByText('2', { exact: true }),
   },

  {idDropdown:'[id="demo-select-performances\\.3\\.score"]', 
  locatorValue: page=> page.locator('[id="demo-select-performances\\.3\\.score"]').getByText('2.5'),
},

  {idDropdown:'[id="demo-select-performances\\.5\\.score"]', 
  locatorValue: page=> page.locator('[id="demo-select-performances\\.5\\.score"]').getByText('3', { exact: true }),
   },
]

 async function selectValue(page,idDropdown,locatorValue){
    await page.locator(idDropdown).click();
    await locatorValue.click();
    await page.locator('body').click();

 }
 for (const SelectScore of selectScore) {
  
    await selectValue(page, SelectScore.idDropdown, SelectScore.locatorValue(page));
 }

});
});

   
    
    



