import { expect, Page } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';


test('step 1 login on HCM system', async ({ apuseroverviewpage, page }) => {
    await test.step('Step 2 Navigate performance-assessment', async () => {
        await page.getByRole('link', { name: 'Admin' }).waitFor({timeout: 5000});
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('link', { name: 'Performance Assessment' }).click();
        await page.getByRole('link', { name: 'Campaigns', exact: true }).click();
        await page.getByRole('row', { name: 'Test ES Department SD' }).getByRole('img').nth(1).click();
        await page.getByText('Assessment Details').click();
    });
       await test.step('step 3 search employee',async()=>{

        
       
       });

    
    });

