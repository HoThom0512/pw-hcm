import {test as base} from '@playwright/test';
import { LoginPage } from "../pom/login.page";
import { OverviewPage } from '../pom/overview.page';


const test = base.extend <{overviewpage: OverviewPage}> ({

overviewpage: async ({page},use) => {

await page.goto('https://qa-nexthcm.banvien.com.vn/login');

const loginpage = new LoginPage(page);
await loginpage.fillInformation("son.nguyen","BVC@12345678");
await loginpage.Login();

const overviewpage = new OverviewPage(page);
await use(overviewpage);

}

});

export {test}