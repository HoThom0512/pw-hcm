import { expect, Page } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';
import {selectAllCriteria} from '../src/utils/dropdownUtils';



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



 const idDropList = [
    {id:'demo-select-selfAssessment.0.self_assessment_score',optionIndex:'3',expectSub: '//tbody/tr[2]/td[5]',actualScore:(item) => (item*0.5).toFixed(2)},
    {id:'demo-select-selfAssessment.2.self_assessment_score',optionIndex:'4',expectSub: '//tbody/tr[4]/td[5]',actualScore:(item) => (item*0.3).toFixed(2)},
    {id:'demo-select-selfAssessment.3.self_assessment_score',optionIndex:'5',expectSub: '//tbody/tr[5]/td[5]',actualScore:(item) => (item*0.7).toFixed(2)},
    {id:'demo-select-selfAssessment.5.self_assessment_score',optionIndex:'2',expectSub: '//tbody/tr[7]/td[5]',actualScore:(item) => (-1*item*1).toFixed(2)},
 
 ]

 for (const listItem of idDropList) {

  const selectListItem = {

    
    page: page, 
    idDropdown: listItem.id, 
    option: listItem.optionIndex, 
    subScorefn: (item: number) => listItem.actualScore(item), 
    expectedSubScore: listItem.expectSub,


  };

  const sumSelfAssessment = await selectAllCriteria(selectListItem);

  
  }


 }








});
 /*const [val1,val2,val3,val4] = idDropList.map(score=> parseFloat(score.expectValue));
 
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

 // await page.locator('//span[text() ="Save as Draft"]').click();
  await page.getByRole('button', { name: 'Save' }).click();

});
 
*/