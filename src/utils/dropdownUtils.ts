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
 * @param locatorComment - locator của textbox comment
 * @param comment - text
 * @returns Giá trị subScore đã tính toán
 * 
  */
type selectAllCriteriaOption ={
  page: Page, 
  idDropdown: string, 
  option: string, 
  subScorefn: (selectScore:number) => string;
  expectedSubScore: string
  locatorComment: string
  comment: string


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

    // input value in search field 
      const inputSearch = page.locator(`${idDropdown} input.ant-select-selection-search-input`);
      await inputSearch.fill(option);
     

    // Step 3: Wait for the at least a value in the dropdown menu to be visible
    const listFillter = page.locator(`${idDropdown} div.ant-select-dropdown div.ant-select-item-option`);
    await listFillter.first().waitFor({state:'visible',timeout:500});
    await page.locator(`${idDropdown} div.ant-select-item-option[title="${option}"]`).click({force:true});
   
    //wait textbox can editable 

    const textBoxComment = page.locator(`${locatorComment} div[role="textbox"]`);
    await expect(textBoxComment).toBeEditable();
    await textBoxComment.fill(comment);

   
   
  // Step 4: After selecting, make sure the value is visible
    const itemSelected = page.locator(`${idDropdown} span.ant-select-selection-item`);
  // await itemSelected.waitFor({ state: 'visible', timeout: 500 });

   // Step 5: Click outside to close the dropdown

    await page.mouse.click(0, 0);

    const SubScoreText = await itemSelected.innerText();
    const selectedScore = parseFloat(SubScoreText); // Convert to float
    const actualSubScore = parseFloat(subScorefn(selectedScore)).toString();

    console.log(`giá trị ${idDropdown} sau khi chọn là ${actualSubScore}`); // Ensure returning the number
    
    // Kiểm tra giá trị actualSubScore đối với locator của expectedSubScore
    await expect(page.locator(expectedSubScore)).toHaveText(actualSubScore);
    return actualSubScore;
}
