import {expect, test as base} from '@playwright/test';
import { LoginPage } from "../pom/login.page";
import { OverviewPage } from '../pom/overview.page';
import { Expect } from '@playwright/test';

type userThom ={

    roleUserThom: OverviewPage
}



const test = base.extend <userThom> ({

roleUserThom: async ({page},use) => {
await page.goto('https://qa-nexthcm.banvien.com.vn/login',{timeout:60000});

const loginpage = new LoginPage(page);
await loginpage.fillInformation("thom.ho","BVC@12345678");
await loginpage.Login();


await expect(page.locator('text=Overview')).toBeVisible();

await use(new OverviewPage(page));

}

});

export {test}