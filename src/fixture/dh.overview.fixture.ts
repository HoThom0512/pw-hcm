import {expect, test as base} from '@playwright/test';
import { LoginPage } from "../pom/login.page";
import { OverviewPage } from '../pom/overview.page';
import { Expect } from '@playwright/test';


type fixtureRoleDH ={

roleDH: OverviewPage;

}


const test = base.extend <{roleDH: OverviewPage}> ({

roleDH: async ({page},use) => {
    
await page.goto("https://qa-nexthcm.banvien.com.vn/login", { waitUntil: "domcontentloaded", timeout:60000});
const loginpage = new LoginPage(page);
await loginpage.fillInformation("huy.do-xuan","BVC@12345678");
await loginpage.Login();
await page.waitForLoadState("networkidle");

//await expect(page.locator('text=Overview')).toBeVisible();
const dhoverviewpage = new OverviewPage(page);
await use(dhoverviewpage);

}

});

export {test}





