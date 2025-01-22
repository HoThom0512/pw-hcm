import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';



test('step 1 login on HCM system', async({useroverviewpage,page}) => {
  
  await test.step('Step 2 Navigate My Performance ', async() =>{
  await page.locator('text = My Performance').click();
  await expect(page.locator('main#content-scroll')).toBeVisible();
  await page.locator('div[class= "style-tab-pane"]').click();
  });
});
