import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';



test('step 1 login on HCM system', async({useroverviewpage,page}) => {
  
  await test.step('Step 2 Navigate My Performance ', async() =>{
  await page.locator('text= My Performance').click();
  await expect(page.locator('main#content-scroll')).toBeVisible();
  });

  await test.step('step 3 click on Assessemt tab', async()=>{
  await page.locator('//span[text()="Assessment"]').click();
  });



 /*await test.step('step 4 select score', async () => {
  // Bước 1: Hover vào phần tử và sau đó click để mở dropdown của dropdown đầu tiên
  await page.locator('div[id="demo-select-selfAssessment.0.self_assessment_score"]').click();
  
  // Chọn giá trị '1' từ dropdown đầu tiên
  await page.locator('div[id="demo-select-selfAssessment.0.self_assessment_score"] >> div.ant-select-item-option:nth-child(3)').click();
  
  // Click vào text 'Weight' để đóng dropdown
  await page.click('text= Weight');

  
  // Bước 3: Mở dropdown thứ 3
  await page.locator('div[id="demo-select-selfAssessment.3.self_assessment_score"]').click();
  
  // Chọn giá trị '2' từ dropdown thứ hai
  await page.locator('div[id="demo-select-selfAssessment.3.self_assessment_score"] >> div.ant-select-item-option:nth-child(4)').click();
  
  // Click vào text 'Weight' để đóng dropdown
  await page.click('text= Weight');


  // Bước 4: Mở dropdown thứ 4
  await page.locator('div[id="demo-select-selfAssessment.5.self_assessment_score"]').click();
  
  // Chọn giá trị '2' từ dropdown thứ hai
  await page.locator('div[id="demo-select-selfAssessment.5.self_assessment_score"] >> div.ant-select-item-option:nth-child(4)').click();
  
  // Click vào text 'Weight' để đóng dropdown
  await page.click('text= Weight');

  */
//a.viết 1 hàm thực hiện thao tác mở dropdown, chọn giá trị và đóng dropdown.
//1. mở dropdown
//2.chọn giá trị trong dropdown
//3. click để đóng dropdown
//b. viết 1 vòng lặp for of dể lưu dropdownid, optionindex

async function selectValueDropList(page, dropdownId, optionIndex) {
 await page.locator(`div[id = "${dropdownId}"]`).click();
 await page.locator(`div[id="${dropdownId}"] >> div.ant-select-item-option:nth-child(${optionIndex})`).click();
 await page.locator('body').click();

}

const idDropList = [
   {id:'demo-select-selfAssessment.0.self_assessment_score',optionIndex:'1'},
   {id:'demo-select-selfAssessment.2.self_assessment_score',optionIndex:'2'},
   {id:'demo-select-selfAssessment.3.self_assessment_score',optionIndex:'3'},
   {id:'demo-select-selfAssessment.5.self_assessment_score',optionIndex:'4'},

]
 for (const SelectIDList of idDropList) {
 await selectValueDropList(page,SelectIDList.id, SelectIDList.optionIndex);

 }
 await page.locator('//span[text() ="Save as Draft"]').click();
});










