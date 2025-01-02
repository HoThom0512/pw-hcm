import {Page} from '@playwright/test';


export class LoginPage {
 page: Page;

 constructor (page: Page) {

    this.page = page;
 }
async fillInformation(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username, {timeout:60000});
    await this.page.locator('input[name="password"]').fill(password, {timeout:60000});

}
 async Login() {
await this.page.locator('button[type="submit"]').click();


 }
 

};