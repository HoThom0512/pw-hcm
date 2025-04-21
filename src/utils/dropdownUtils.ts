// utils/dropdownUtils.ts

import { Page, Locator } from 'playwright';
import { expect } from 'playwright/test';

/**
 * Hàm selectAllCriteria để thao tác với dropdown
 * @param page - Trang hiện tại (Playwright Page object)
 * @param idDropdown - ID của dropdown cần thao tác
 * @param option - Option cần chọn trong dropdown
 * @param subScorefn - Hàm tính toán giá trị subScore
 * @param expectedSubScore - Locator của subScore mà bạn muốn kiểm tra
 * @locatorComment
 * @comment
 * @returns Giá trị subScore đã tính toán
 * 
  */
type selectAllCriteriaOption ={
  page: Page, 
  idDropdown: string, 
  option: string, 
  subScorefn: (selectScore:number) => string;
  expectedSubScore: string,
  locatorComment:string,
  comment: string,


}




export async function selectAllCriteria(
 { page, idDropdown, option,subScorefn,
  expectedSubScore, locatorComment,comment} :selectAllCriteriaOption
): Promise<string> {

    // Step 1: Click on dropdown to open the dropdown list
    const selectedItem = page.locator(`${idDropdown} span.ant-select-selection-item`);
    await selectedItem.waitFor({state:'visible'});
    await selectedItem.click({ force: true });

    // Step 2: Wait for the dropdown menu to be visible
    const dropdownMenu = page.locator(`${idDropdown} div.ant-select-dropdown`);
    await page.waitForSelector(`${idDropdown} div.ant-select-dropdown`, { state: 'attached',timeout:10000 });
    await dropdownMenu.waitFor({ state: 'visible', timeout: 7000 });

    //step 3: input value in search field
    await page.locator(`${idDropdown} input.ant-select-selection-search-input`).fill(option);

    // Step 4: wait list option to visible
    const listOption = page.locator(`${idDropdown} div.ant-select-item-option`);
    await listOption.first().waitFor({ state: 'visible', timeout: 6000 });
   
    // Step 4.1: Lấy chính xác option có title === option
   const exactOption = page.locator(`${idDropdown} .ant-select-item-option[title="${option}"]`);
   await exactOption.waitFor({ state: 'visible', timeout: 3000 });
   await exactOption.click({ force: true });
  

    //Step 5: wait for comment textbox to be editable 
    const noteComment = page.locator(`div[name="${locatorComment}"] div[role="textbox"]`);
    await expect(noteComment).toBeEditable();
    await noteComment.fill(comment);
    await expect(noteComment).toHaveText(comment);

    /*Step 4: Wait for the value in the dropdown menu to be visible
    const listValue = page.locator(`${idDropdown} div.ant-select-item-option[title="${option}"]`);
    await listValue.waitFor({ state: 'visible', timeout: 7000 });
    await listValue.click({ force: true });*/

    
    // Step 5: Click outside to close the dropdown
    //await page.locator('body').click();
    await page.mouse.click(0, 0);

    const SubScoreText = await selectedItem.innerText();
    const selectedScore = parseFloat(SubScoreText); // Convert to float
    const actualSubScore = parseFloat(subScorefn(selectedScore)).toString();

    console.log(`giá trị ${idDropdown} sau khi chọn là ${actualSubScore}`); // Ensure returning the number
    
    // Kiểm tra giá trị actualSubScore đối với locator của expectedSubScore
    await expect(page.locator(expectedSubScore)).toHaveText(actualSubScore);
    return actualSubScore;
}
