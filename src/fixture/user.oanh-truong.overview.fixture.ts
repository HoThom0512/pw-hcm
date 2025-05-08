
import {expect, test as base} from '@playwright/test'
import { LoginPage } from '../pom/login.page'
import { OverviewPage } from '../pom/overview.page'



type userOanh ={

roleUserOanh: OverviewPage

}

const test = base.extend<userOanh> ({

   roleUserOanh : async ({page}, use) => {

    await page.goto('https://qa-nexthcm.banvien.com.vn/login',{timeout:60000});
    const loginpage = new LoginPage(page);
    await loginpage.fillInformation("oanh.truong","BVC@12345678");
   
    await loginpage.Login();
    await page.waitForLoadState("networkidle");
 
    await use(new OverviewPage(page));
 
    }
});

export {test};