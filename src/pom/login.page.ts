import {Page} from '@playwright/test';


export class LoginPage {
 page: Page;

 constructor (page: Page) {

    this.page = page;
 }
async fillInformation(username: string, password: string) {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);

}
 async Login() {
await this.page.locator('button[type="submit"]').click();


 }
 

};