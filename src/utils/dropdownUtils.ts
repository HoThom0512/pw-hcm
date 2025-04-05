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
 * @returns Giá trị subScore đã tính toán
 * @pa
  */
type selectAllCriteriaOption ={
  page: Page, 
  idDropdown: string, 
  option: string, 
  subScorefn: (selectScore:number) => string;
  expectedSubScore: string


}




export async function selectAllCriteria(
 { page, idDropdown, option,subScorefn,
  expectedSubScore} :selectAllCriteriaOption
): Promise<string> {

    // Step 1: Click on dropdown to open the dropdown list
    const selectedItem = page.locator(`${idDropdown} span.ant-select-selection-item`);
    await selectedItem.waitFor({state:'visible'});
    await selectedItem.click({ force: true });

    // Step 2: Wait for the dropdown menu to be visible
    const dropdownMenu = page.locator(`${idDropdown} div.ant-select-dropdown`);
    await page.waitForSelector(`${idDropdown} div.ant-select-dropdown`, { state: 'attached',timeout:10000 });
    await dropdownMenu.waitFor({ state: 'visible', timeout: 7000 });

    // Step 3: Wait for the value in the dropdown menu to be visible
    const listValue = page.locator(`${idDropdown} div.ant-select-item-option[title="${option}"]`);
    await listValue.waitFor({ state: 'visible', timeout: 7000 });
    await listValue.click({ force: true });

    // Step 4: After selecting, make sure the value is visible
    const itemSelected = page.locator(`${idDropdown} span.ant-select-selection-item[title="${option}"]`);
    await itemSelected.waitFor({ state: 'visible', timeout: 500 });

    // Step 5: Click outside to close the dropdown
    //await page.locator('body').click();
    await page.mouse.click(0, 0);

    const SubScoreText = await itemSelected.innerText();
    const selectedScore = parseFloat(SubScoreText); // Convert to float
    const actualSubScore = parseFloat(subScorefn(selectedScore)).toString();

    console.log(`giá trị ${idDropdown} sau khi chọn là ${actualSubScore}`); // Ensure returning the number
    
    // Kiểm tra giá trị actualSubScore đối với locator của expectedSubScore
    await expect(page.locator(expectedSubScore)).toHaveText(actualSubScore);
    return actualSubScore;
}
