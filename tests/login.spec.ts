import {Page, expect} from '@playwright/test';
import { text } from 'stream/consumers';
import { test } from '../src/fixture/index.fixture';


test ('login', async({roleUserThom,page})=> {

    
    const overviewPage = page.locator('a[href="/overview"]').nth(0);
    await overviewPage.waitFor({state:'visible'});

    const textDashboard = page.locator('div.welcome-back');
    //await textDashboard.waitFor({state:'visible'});
    await expect(textDashboard).toHaveText(/Welcome back,\s*HO THI THOM/);
    
    await test.step('click logout', async () =>{
    //click on image to show option logout
    await page.locator('span.text-image',{hasText:'T'}).click();

    //wait for popup option logout visible
    const popUpLogout = page.locator('button.button-content > span.ant-typography',{hasText:'Sign Out'});
    await popUpLogout.waitFor({state:'visible'});
    await popUpLogout.click();
    await expect(page).toHaveURL('https://qa-nexthcm.banvien.com.vn/login');


    })
  


});