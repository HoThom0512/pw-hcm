import { expect, Page } from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';
import { popupMessage } from '../../src/utils/notificationUtils';


test('step 1 login on HCM system', async ({ apuseroverviewpage, page }) => {

    await test.step('Step 2 Navigate performance-assessment', async () => {
        await page.getByRole('link', { name: 'Admin' }).waitFor({timeout: 5000});
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('link', { name: 'Performance Assessment' }).click();
        await page.getByRole('link', { name: 'Campaigns', exact: true }).click();
        await page.getByRole('row', { name: 'Test ES Department SD' }).getByRole('img').nth(1).click();
        await page.getByText('Assessment Details').click();
        await page.getByRole('textbox', { name: 'Search by name...' }).fill('oanh');
        await expect(page.getByRole('cell', { name: 'TRUONG THI KIM OANH' })).toBeVisible();
       // await page.getByRole('row', { name: '1503002 TRUONG THI KIM OANH' }).getByRole('img').nth(2).click();


        });
      

      await test.step('Step 3 checked in f2f checkbox', async () => {
      //verify state checkbox
      const checkbox=  page.locator('td:nth-child(12) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').first();

      await checkbox.waitFor({state:'visible',timeout:500});
      await checkbox.click();
      const ischecked = await checkbox.isChecked();
      console.log(`the status for checkbox is ${ischecked}`) ; 

       //verify state checkbox

       /*const notification = page.locator('.ant-notification.ant-notification-bottomLeft');
       await notification.waitFor({state:'visible',timeout:5000});
       await expect(notification).toHaveText('Update F2F status successfully!');
       */

       //Reviewed employee successfully!

       await popupMessage(page,'.ant-notification.ant-notification-bottomLeft','Update F2F status successfully!');
       
      });

    
    });

