import {expect, test as base} from '@playwright/test';
import { LoginPage } from "../pom/login.page";
import { OverviewPage } from '../pom/overview.page';
import { Expect } from '@playwright/test';


const test = base.extend <{overviewpage: OverviewPage}> ({

overviewpage: async ({page},use) => {

await page.goto('https://qa-nexthcm.banvien.com.vn/login', {timeout:60000 });

const loginpage = new LoginPage(page);
await loginpage.fillInformation("son.nguyen","BVC@12345678");
await loginpage.Login();

await expect(page).toHaveURL('https://qa-nexthcm.banvien.com.vn/overview', {timeout:60000});
const overviewpage = new OverviewPage(page);
await use(overviewpage);

}

});

export {test}