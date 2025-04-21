import { expect, Page } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';
import {selectAllCriteria} from '../src/utils/dropdownUtils';
import {popupMessage} from '../src/utils/notificationUtils';
 


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
    {id:'#demo-select-selfAssessment\\.0\\.self_assessment_score',optionIndex:'3.5',expectSub: '//tbody/tr[2]/td[5]',actualScore:(item) => (item*0.5).toFixed(2),locatorComment:'selfAssessment\\.0\\.employee_comment',comment:'box1'},
    {id:'#demo-select-selfAssessment\\.2\\.self_assessment_score',optionIndex:'4.5',expectSub: '//tbody/tr[4]/td[5]',actualScore:(item) => (item*0.3).toFixed(2),locatorComment:'selfAssessment\\.2\\.employee_comment',comment:'box2'},
    {id:'#demo-select-selfAssessment\\.3\\.self_assessment_score',optionIndex:'1',expectSub: '//tbody/tr[5]/td[5]',actualScore:(item) => (item*0.7).toFixed(2),locatorComment:'selfAssessment\\.3\\.employee_comment',comment:'box3'},
    {id:'#demo-select-selfAssessment\\.5\\.self_assessment_score',optionIndex:'0.5',expectSub: '//tbody/tr[7]/td[5]',actualScore:(item) => (-1*item*1).toFixed(2),locatorComment:'selfAssessment\\.5\\.employee_comment',comment:'box4'},
 ]

 let valueSelf: number[] =[];
 for (const listItem of idDropList) {

  const selectListItem = {
    
    page: page, 
    idDropdown: listItem.id, 
    option: listItem.optionIndex, 
    subScorefn: (item: number) => listItem.actualScore(item), 
    expectedSubScore: listItem.expectSub,
    locatorComment: listItem.locatorComment,
    comment:listItem.comment,

  }
  const sumSelfAssessment = await selectAllCriteria(selectListItem);
  valueSelf.push(parseFloat(sumSelfAssessment));
 
  if(parseFloat(listItem.optionIndex) >=3.5){
  await selectAllCriteria({

    page: page, 
    idDropdown: listItem.id, 
    option: listItem.optionIndex, 
    subScorefn: (item: number) => listItem.actualScore(item), 
    expectedSubScore: listItem.expectSub,
    locatorComment: listItem.locatorComment,
    comment:listItem.comment,

  });

  }


  }

  const[s1,s2,s3,s4] = valueSelf

  const sumSelf = (s1*0.5) +(s2+s3)*0.5 + (s4*0.1);

  const totalSumSelf = Math.round(sumSelf +Number.EPSILON)*100/100

  const finalSelf = await page.locator('div.card__score--value >div').first().textContent();

  console.log(`giá trị final sau khi sum ${finalSelf}`);

  await expect(page.locator('div').filter({ hasText: totalSumSelf.toString() }).nth(1)).toContainText(totalSumSelf.toString());
  
  await test.step('Step 4 click "Save as Draft" button', async()=>{

  
   await page.getByRole('button',{name:'Save as Draft'}).click();
  
   await popupMessage(page,'.ant-notification.ant-notification-bottomLeft','Self assessment successfully!');
 
   /*await test.step('Step 5 click on "Submit" button',async()=>{
  
    await page.getByRole('button',{name:'Submit',exact:true}).click();
    
    const popupConfirm = page.locator('.ant-modal-body')
    await popupConfirm.waitFor({state:'visible'});
    await page.getByRole('button',{name:'Confirm',exact:true}).click();
   */
  });


  
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

/*click vào dropdown 2
const searchBox = page.locator('#demo-select-selfAssessment\\.2\\.self_assessment_score span.ant-select-selection-item');
await searchBox.click();

// chờ searchbox mở
const openSearchbox= page.locator('#demo-select-selfAssessment\\.2\\.self_assessment_score div.ant-select-dropdown');
await openSearchbox.waitFor({state:'visible'});
 
//input giá trị vào field search
await page.locator('#demo-select-selfAssessment\\.2\\.self_assessment_score input.ant-select-selection-search-input').fill('3.5');

const listSearch = page.locator('#demo-select-selfAssessment\\.2\\.self_assessment_score div.ant-select-item-option[title="3.5"]');
await listSearch.waitFor({state:'visible'});
await listSearch.click({force:true});


//chờ comment box enable
const comment1 = page.locator('div[name="selfAssessment\\.2\\.employee_comment"] div[role="textbox"]');
await comment1.isEditable();
await comment1.fill('agree2');

await page.mouse.click(0,0);



//click vào dropdown 3
const searchBox2 = page.locator('#demo-select-selfAssessment\\.3\\.self_assessment_score span.ant-select-selection-item');
await searchBox2.click();

// chờ searchbox mở
const openSearchbox2= page.locator('#demo-select-selfAssessment\\.3\\.self_assessment_score div.ant-select-dropdown');
await openSearchbox2.waitFor({state:'visible'});
 
//input giá trị vào field search
await page.locator('#demo-select-selfAssessment\\.3\\.self_assessment_score input.ant-select-selection-search-input').fill('4');

const listSearch2 = page.locator('#demo-select-selfAssessment\\.3\\.self_assessment_score div.ant-select-item-option[title="4"]');
await listSearch2.waitFor({state:'visible'});
await listSearch2.click({force:true});

//chờ comment box enable
const comment2 = page.locator('div[name="selfAssessment\\.3\\.employee_comment"] div[role="textbox"]');
await comment2.isEditable();
await comment2.fill('agree3');
await page.mouse.click(0,0);
});
*/