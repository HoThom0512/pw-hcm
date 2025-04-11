import{Page,Dialog} from '@playwright/test';
import {expect} from '@playwright/test';

/** 
@param page - đối tượng Page của Playwright
@param expectedMessage - thông điệp mà bạn mong muốn xuất hiện trong popup 

*/

export async function savePopup (page:Page,expectedMessage:string) {
    page.on('dialog',async(dialog:Dialog) => {

    await expect(dialog.message()).toContain(expectedMessage);
   
    console.log(`content the message is ${dialog.message()}`);
    await dialog.accept();

    });


}