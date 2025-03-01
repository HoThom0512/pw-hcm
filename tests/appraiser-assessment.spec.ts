import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';


test('step 1 login on HCM system', async({apuseroverviewpage,page}) => {
  
    await test.step('Step 2 Navigate performance-assessment ', async() =>{
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', {name:'Performance Assessment'}).click();
    await page.getByRole('link', { name: 'Campaigns', exact: true }).click();
    await page.getByRole('row', { name: 'Test ES Department SD' }).getByRole('img').nth(1).click();
    await page.getByText('Assessment Details').click();
    await page.getByRole('textbox', { name: 'Search by name...' }).fill('oanh');
    await expect(page.getByRole('cell', { name: 'TRUONG THI KIM OANH' })).toBeVisible();
    await page.getByRole('row', { name: '1503002 TRUONG THI KIM OANH' }).getByRole('img').nth(2).click();

    await test.step('step 3 Appraiser evalue score ', async()=>{
        
        /*const listScore = [ 
            {
                locatordroplist: `locator('[id="demo-select-performances\\.0\\.score"] div').filter({ hasText: /^0$/ }).nth(1)`,
                //openlist: `locator('div').filter({ hasText: /^00\.500\.511\.522\.53$/ }).nth(2)`,
                //locatorlist: `locator('[id="demo-select-performances\\.0\\.score"] span').filter({ hasText: '3' })`
            },
            {
                locatordroplist: `locator('[id="demo-select-performances\\.2\\.score"] div').filter({ hasText: /^1$/ }).nth(1))`,
                //openlist: `locator('div').filter({ hasText: /^00\.52\.533\.544\.55$/ }).nth(2)`,
                //locatorlist: `locator('[id="demo-select-performances\\.2\\.score"]').getByText('3')`
            },
            {
                locatordroplist: `locator('[id="demo-select-performances\\.3\\.score"] div').filter({ hasText: /^3$/ }).nth(1)`,
                //openlist: `locator('div').filter({ hasText: /^00\.5100\.511\.522\.53$/ }).nth(2)`,
                //locatorlist: `locator('[id="demo-select-performances\\.3\\.score"]').getByText('3')`
            },
            {
                locatordroplist: `locator('[id="demo-select-performances\\.5\\.score"] div').filter({ hasText: /^1$/ }).nth(1)`,
                //openlist: `locator('div').filter({ hasText: /^4\.552\.533\.544\.55$/ }).nth(2)`,
                //locatorlist: `locator('[id="demo-select-performances\\.5\\.score"]').getByText('0.5')`
            }
        ];
        
    async function selectValue(page, locatordroplist, openlist,locatorlist){
    
    await page.locatordroplist.click();
    await expect(openlist).toBeVisible();
    await page.locatorlist.click()

    };
     */
    console.log(await page.locator('[id="demo-select-performances\\.0\\.score"] div').filter({ hasText: /^1$/ }).nth(1).innerText());

  

    });
       
    });
});