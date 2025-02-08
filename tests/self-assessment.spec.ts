import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';



test('step 1 login on HCM system', async({useroverviewpage,page}) => {
  
  await test.step('Step 2 Navigate My Performance ', async() =>{
  await page.locator('text= My Performance').click();
  await expect(page.locator('main#content-scroll')).toBeVisible();
  });

  await test.step('click on Assessemt tab', async()=>{
  await page.locator('//span[text()="Assessment"]').click();
  });

  /*const criteria = [
    {c1:'LnD Activities ',opendropdown:'span.ant-select-selection-search', locator:'span.ant-select-selection-item[title="3"]'},
    {c2a:'Role and Responsibilities',opendropdown:'span.ant-select-selection-search', locator:'span.ant-select-selection-item[title="2"]'},
    {c2b:'Teamwork & Communication',opendropdown:'span.ant-select-selection-search', locator:'span.ant-select-selection-item[title="1"]'},
    {c3a:'Quality', opendropdown:'span.ant-select-selection-search',locator:'span.ant-select-selection-item[title="0.5"]'},
  ]
   //const Criteria = criteria;

  for(const Criteria of criteria){
    await page.locator(`${Criteria.opendropdown}`).first().click();
    await page.locator(`${Criteria.locator}`).first().click();
    
  }*/
  const criteria = [
    { c1: 'LnD Activities', title: '3' },
    { c2a: 'Role and Responsibilities', title: '2' },
    { c2b: 'Teamwork & Communication', title: '1' },
    { c3a: 'Quality', title: '0.5' },
  ];
// Mở dropdown một lần duy nhất
await page.locator('span.ant-select-selection-search').first().waitFor({ state: 'visible' }); // Đảm bảo phần tử có thể nhấp
await page.locator('span.ant-select-selection-search').first().scrollIntoViewIfNeeded(); // Cuộn vào nếu cần
await page.locator('span.ant-select-selection-search').first().click(); // Click vào dropdown

// Duyệt qua các phần tử trong mảng 'criteria' và thực hiện thao tác click
for (const criterion of criteria) {
  const locator = `span.ant-select-selection-item[title="${criterion.title}"]`;
  
  // Đảm bảo phần tử có thể nhấp vào trước khi thực hiện hành động
  await page.locator(locator).waitFor({ state: 'visible' });
  await page.locator(locator).click();
}
});






