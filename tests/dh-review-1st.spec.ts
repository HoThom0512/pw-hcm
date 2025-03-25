import { expect, Page } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';


test('step 1 login on HCM system', async ({ dhoverviewpage, page }) => {
    await test.step('Step 2 Navigate performance-assessment', async () => {
        await page.getByRole('link', { name: 'Admin' }).waitFor({timeout: 5000});
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('link', { name: 'Performance Assessment' }).click();
        await page.getByRole('link', { name: 'Campaigns', exact: true }).click();
        await page.getByRole('row', { name: 'Test ES Department SD' }).getByRole('img').nth(1).click();
        await page.getByText('Assessment Details').click();
    });
       await test.step('step 3 click Approval buttun',async()=>{
       await page.getByRole('button', { name: 'Approve' }).click();
       });

       await test.step('Step 4 the process has not comming after click confirm button', async()=> { 

       await expect(page.getByText('?Are you sure you want to')).toBeVisible();
       await page.getByRole('button', { name: 'Confirm' }).click()

       await expect(page.locator('.ant-notification-notice')).toHaveText('Can not approve campaign in this process');
       await page.locator('.ant-notification-notice-close').click();
       
       await page.getByRole('button',{name:'Cancel'}).click();
       

       });

    
    });
