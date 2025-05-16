import {Page, expect} from '@playwright/test';
import { test } from '../src/fixture/index.fixture';


test ('login', async({roleUserThom,page})=> {

    
    const overviewPage = page.locator('a[href="/overview"]').nth(0);
    await overviewPage.waitFor({state:'visible'});

    const textDashboard = page.locator('div.welcome-back');
    //await textDashboard.waitFor({state:'visible'});
    await expect(textDashboard).toHaveText(/Welcome back,\s*HO THI THOM/);
});