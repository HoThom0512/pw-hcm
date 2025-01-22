import {expect, test as base} from '@playwright/test';
import { LoginPage } from "../pom/login.page";
import { OverviewPage } from '../pom/overview.page';
import { Expect } from '@playwright/test';


const test = base.extend <{useroverviewpage: OverviewPage}> ({

useroverviewpage: async ({page},use) => {
await page.goto('https://qa-nexthcm.banvien.com.vn/login');

const loginpage = new LoginPage(page);
await loginpage.fillInformation("thom.ho","BVC@12345678");
await loginpage.Login();


await expect(page.locator('a[href="/overview"]:nth-of-type(1)')).toBeVisible();

const useroverviewpage = new OverviewPage(page);
await use(useroverviewpage);

}

});

export {test}