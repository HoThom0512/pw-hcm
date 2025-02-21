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


//a.viết 1 hàm thực hiện thao tác mở dropdown, chọn giá trị và đóng dropdown.
//1. mở dropdown
//2.chọn giá trị trong dropdown
//3. click để đóng dropdown
//b. viết 1 vòng lặp for of dể lưu dropdownid, optionindex


/*async function selectValueDropList(page, dropdownId, optionIndex, locatorSubScore, SubScore) {
 await page.locator(`div[id = "${dropdownId}"]`).click();
 await page.locator(`div[id="${dropdownId}"] >> div.ant-select-item-option:nth-child(${optionIndex})`).click();
 await page.locator('body').click();
 await expect(page.locator(locatorSubScore)).toHaveText(SubScore);

}

const idDropList = [
   {id:'demo-select-selfAssessment.0.self_assessment_score',optionIndex:1, locatorSubScore:'//tbody/tr[2]/td[3]/td[1]/text()', SubScore: 0},
   {id:'demo-select-selfAssessment.2.self_assessment_score',optionIndex:2, locatorSubScore:'//tbody/tr[4]/td[3]/td[1]/text()', SubScore: 0.15},
   {id:'demo-select-selfAssessment.3.self_assessment_score',optionIndex:3, locatorSubScore:'//tbody/tr[5]/td[3]/td[1]/text()', SubScore: 0.7},
   {id:'demo-select-selfAssessment.5.self_assessment_score',optionIndex:4, locatorSubScore:'//tbody/tr[7]/td[3]/td[1]/text()', SubScore: -0.15},

]
//let toTalSelfAssessment = "";
 /*for (const SelectIDList of idDropList) {
 await selectValueDropList(page,SelectIDList.id, SelectIDList.optionIndex); *

 }*/
/*for (let i=0; i< idDropList.length; i++){

  const SelectIDList = idDropList[i];
  
  await selectValueDropList(page, SelectIDList.id, SelectIDList.optionIndex, SelectIDList.locatorSubScore, SelectIDList.SubScore);
  
 
}


 await page.locator('//span[text() ="Save as Draft"]').click();
});

/*const text1 = await page.locator('//tbody/tr[2]/td[3]/td[1]/text()');
const text2 = await page.locator('//tbody/tr[4]/td[3]/td[1]/text()');
const text3 = await page.locator('//tbody/tr[5]/td[3]/td[1]/text()');
const text4 = await page.locator('//tbody/tr[7]/td[3]/td[1]/text()');

console.log(text1);
console.log(text2);  // In ra giá trị "0"
console.log(text3);
console.log(text4);
*/
 /*await page.locator('div[id = "demo-select-selfAssessment.0.self_assessment_score"]').click();
 await page.locator('div[id="demo-select-selfAssessment.0.self_assessment_score"] >> div.ant-select-item-option:nth-child(2)').click();
 await page.locator('body').click();
*/

const locator = await page.locator('//tbody/tr[2]/td[5]').innerText();
console.log(locator);
//const textreceived = await expect(locator).toHaveText('0.25');
//console.log(textreceived);
});






