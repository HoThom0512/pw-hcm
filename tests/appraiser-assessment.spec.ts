import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';


test('step 1 login on HCM system', async({apuseroverviewpage,page}) => {
  
    await test.step('Step 2 Navigate My Performance ', async() =>{
    
    await expect(page.locator('text= My Performance')).toHaveText('My Performance');
    await page.locator('text= My Performance').click();
    await expect(page.locator('main#content-scroll')).toBeVisible();
    });
  
    await test.step('step 3 click on Assessemt tab', async()=>{
    await page.locator('//span[text()="Assessment"]').click();
    });
});