import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';



test('step 1 login on HCM system', async({useroverviewpage,page}) => {
  
  await test.step('Step 2 Navigate My Performance ', async() =>{
  
  await expect(page.locator('text= My Performance')).toHaveText('My Performance');
  await page.locator('text= My Performance').click();
  await expect(page.locator('main#content-scroll')).toBeVisible();
  });

  await test.step('step 3 click on Assessemt tab', async()=>{
  await page.locator('//span[text()="Assessment"]').click();
  });



// a. viết hàm click chọn giá trị của drop list
// 1. click dropdown to open
// 2. chọn giá trị trong listdropdown
// 3. click outside để đóng dropdown
// b. viết vòng lặp for i hoặc for of để lặp qua 4 drop down
// c. verify total self score

async function selectValueDropList(page, dropdownId, optionIndex, locatorSubScore, expectValue) {
  await page.locator(`div[id = "${dropdownId}"]`).click();
  await page.locator(`div[id="${dropdownId}"] >> div.ant-select-item-option:nth-child(${optionIndex})`).click({timeout:60000});
  await page.locator('body').click();
  const resultActual = await page.locator(locatorSubScore).innerText();
  await expect(resultActual).toBe(expectValue);
 
 }

 const idDropList = [
    {id:'demo-select-selfAssessment.0.self_assessment_score',optionIndex:'3', locatorSubScore: '//tbody/tr[2]/td[5]',expectValue:'0.5'},
    {id:'demo-select-selfAssessment.2.self_assessment_score',optionIndex:'4',locatorSubScore: '//tbody/tr[4]/td[5]',expectValue:'0.45'},
    {id:'demo-select-selfAssessment.3.self_assessment_score',optionIndex:'5',locatorSubScore: '//tbody/tr[5]/td[5]',expectValue:'1.4'},
    {id:'demo-select-selfAssessment.5.self_assessment_score',optionIndex:'2',locatorSubScore: '//tbody/tr[7]/td[5]',expectValue:'-0.5'},
 
 ]

 const [val1,val2,val3,val4] = idDropList.map(score=> parseFloat(score.expectValue));
 
 console.log(`val1: ${val1}, val2: ${val2}, val3: ${val3}, val4: ${val4}`);

 const sumVal = 
    (val1) + 
    ((val2 + val3) * 0.5) + 
    (val4 * 0.1);

// Làm tròn bằng cách cộng Number.EPSILON trực tiếp
const finalSum = Math.round((sumVal + Number.EPSILON) * 100) / 100;

console.log(`Total: ${finalSum}`);
console.log(`val1: ${val1}`);
console.log(`val2 + val3: ${val2 + val3}`);
console.log(`(val2 + val3) * 0.5: ${(val2 + val3) * 0.5}`);
console.log(`val4 * 0.1: ${val4 * 0.1}`);
console.log(`sumVal trước khi làm tròn: ${sumVal}`);
console.log(`sumVal sau khi làm tròn: ${finalSum}`);



 for (let i=0; i<idDropList.length;i++){
  const selectIDropList = idDropList[i];
  //totalScore+=parseFloat(selectIDropList.expectValue);

  await selectValueDropList(page,selectIDropList.id,selectIDropList.optionIndex,selectIDropList.locatorSubScore,selectIDropList.expectValue);
  
 }

  await expect(page.getByText(finalSum.toFixed(2))).toBeVisible();

  await page.locator('//span[text() ="Save as Draft"]').click();
});
 
