import { expect, Page } from '@playwright/test';
import { test } from '../../src/fixture/index.fixture';
import { selectAllCriteria } from '../../src/utils/dropdownUtils';
import { savePopup } from '../../src/utils/dialogUtils';

test('step 1 login on HCM system', async ({ apuseroverviewpage, page }) => {

    await test.step('Step 2 Navigate performance-assessment', async () => {
        await page.getByRole('link', { name: 'Admin' }).waitFor({timeout: 5000});
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('link', { name: 'Performance Assessment' }).click();
        await page.getByRole('link', { name: 'Campaigns', exact: true }).click();
        await page.locator('div.sc-fLDLck.ddtnrU svg[xmlns="http://www.w3.org/2000/svg"]').nth(0).click();
        await page.getByText('Assessment Details').click();
        await page.getByRole('textbox', { name: 'Search by name...' }).fill('oanh');
        await expect(page.getByRole('cell', { name: 'TRUONG THI KIM OANH' })).toBeVisible();
        await page.getByRole('row', { name: '1503002 TRUONG THI KIM OANH' }).getByRole('img').nth(2).click();


        });
      

    await test.step('Step 3 Appraiser evaluate score', async () => {

     const evaluateValues = [

        {idDropdown:'#demo-select-performances\\.0\\.score', 
        option:'1',
        subScore: (scoreselected)=>(scoreselected*0.5).toFixed(2),
        expectedSubScore: '.ant-col > .ant-table-wrapper > div > div > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > tr:nth-child(2) > td:nth-child(8)',
        apLocatorComment: 'div[name ="performances\\.0\\.comment"]',
        apComment:'ok1'
      },

        {idDropdown:'#demo-select-performances\\.2\\.score',
        option:'2',
        subScore: (scoreselected)=>(scoreselected*0.3).toFixed(2),
        expectedSubScore: 'tr:nth-child(4) > td:nth-child(8)',
        apLocatorComment: 'div[name ="performances\\.2\\.comment"]',
        apComment:'ok2'
        },

    
        {idDropdown:'#demo-select-performances\\.3\\.score', 
        option:'2.5',
        subScore: (scoreselected)=>(scoreselected*0.7).toFixed(2),
        expectedSubScore: 'tr:nth-child(5) > td:nth-child(8)',
        apLocatorComment: 'div[name ="performances\\.3\\.comment"]',
        apComment:'ok3'
        },

        {idDropdown:'#demo-select-performances\\.5\\.score', 
        option:'0.5',
        subScore: (scoreselected)=>(-1*scoreselected*1).toFixed(2),
        expectedSubScore: 'tr:nth-child(7) > td:nth-child(8)',
        apLocatorComment: 'div[name ="performances\\.5\\.comment"]',
        apComment:'ok4'
        },
      ]


   
     
    let value:number[] =[]
    for (const selectValue of evaluateValues) {
     
      const apEvalue = {

        page: page, 
        idDropdown: selectValue.idDropdown,
        option: selectValue.option,
        subScorefn: (selectedScore: number) =>selectValue.subScore(selectedScore), 
        expectedSubScore: selectValue.expectedSubScore,
        locatorComment: selectValue.apLocatorComment,
        comment: selectValue.apComment,
      }
        
     const apSumValue= await selectAllCriteria(apEvalue);

     value.push(parseFloat(apSumValue));

     //if the score >=3.5 the system required comment 
  if (parseFloat(selectValue.option) >=3.5 && selectValue.apComment ==='') 
  {
  await selectAllCriteria(apEvalue)
 
  }

else {
console.log('skip comment because not required')

  }
  }
    //create a new array to save value
    const [v1,v2,v3,v4] = value;

    const finalValue = (v1) +(v2+v3)*0.5 + (v4)*0.1
    const roundValue = Math.round((finalValue + Number.EPSILON)*100)/100

    console.log(`giá trị sum là ${roundValue}`)


    const paScore = await page.locator('div.card__score--value.bad > div').textContent();
    console.log(`PA Score ${paScore}`);

    await expect(page.locator('div').filter({ hasText: roundValue.toString() }).nth(1)).toContainText(roundValue.toString());


    await page.getByRole('button', { name: 'Save' }).click();
    const notification = page.locator('.ant-notification.ant-notification-bottomLeft');
    await notification.waitFor({ state: 'visible', timeout: 5000 }); // Chờ notification hiển thị
    await expect(notification).toHaveText('Grading score successfully');



     });
    });

  /*click vào dropdown 
 await page.locator('#demo-select-performances\\.3\\.score span.ant-select-selection-item').click();
 
//chờ list menu mở
const listMenu = page.locator('#demo-select-performances\\.3\\.score div.ant-select-dropdown');
await page.waitForSelector('#demo-select-performances\\.3\\.score div.ant-select-dropdown',{state:'attached'});
await listMenu.waitFor({state:'visible'});
//chọn giá trị từ listmenu 
await  page.locator('#demo-select-performances\\.3\\.score div.ant-select-item-option[title="3"]').click({force:true, timeout:500});
const itemVisible = page.locator('#demo-select-performances\\.3\\.score span.ant-select-selection-item');
await itemVisible.waitFor({state:'visible',timeout:500});

//await page.keyboard.press('Escape');
//await page.mouse.click(0, 0);

//await page.locator('body').click();

});


});


*/