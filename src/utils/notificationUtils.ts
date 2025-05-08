import { expect, Page } from '@playwright/test';


export async function popupMessage(page:Page, locatorPopup:string, expectedContent: string):Promise<string> {

 const commonNotification  = page.locator(locatorPopup);

 await commonNotification.waitFor({state:'visible'});
 await expect(page.locator(locatorPopup)).toHaveText(expectedContent);
 await page.locator('.ant-notification-notice-close').click();

 return expectedContent
}



