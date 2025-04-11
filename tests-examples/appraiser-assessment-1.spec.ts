import { expect, Page } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';

test('step 1 login on HCM system', async ({ apuseroverviewpage, page }) => {

    await test.step('Step 2 Navigate performance-assessment', async () => {
        await page.getByRole('link', { name: 'Admin' }).waitFor({timeout: 5000});
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('link', { name: 'Performance Assessment' }).click();
        await page.getByRole('link', { name: 'Campaigns', exact: true }).click();
        await page.getByRole('row', { name: 'Test ES Department SD' }).getByRole('img').nth(1).click();
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
        expectedSubScore: '.ant-col > .ant-table-wrapper > div > div > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > tr:nth-child(2) > td:nth-child(8)'
        },

        {idDropdown:'#demo-select-performances\\.2\\.score',
        option:'2',
        subScore: (scoreselected)=>(scoreselected*0.3).toFixed(2),
        expectedSubScore: 'tr:nth-child(4) > td:nth-child(8)'    
        },

    
        {idDropdown:'#demo-select-performances\\.3\\.score', 
        option:'2.5',
        subScore: (scoreselected)=>(scoreselected*0.7).toFixed(2),
        expectedSubScore: 'tr:nth-child(5) > td:nth-child(8)'
        },

        {idDropdown:'#demo-select-performances\\.5\\.score', 
        option:'0.5',
        subScore: (scoreselected)=>(-1*scoreselected*1).toFixed(2),
        expectedSubScore: 'tr:nth-child(7) > td:nth-child(8)'
        },
     ]



   async function selectAllCriteria(page,idDropdown,option,subScorefn,expectedSubScore){
       //step 1: click on dropdown to open dropdownlist
        const selectedItem = page.locator(`${idDropdown} span.ant-select-selection-item`);
        await selectedItem.waitFor({state:'visible'});
        await selectedItem.click({force:true});

      //step 2: wait dropdownmenu to visible
        const dropdownMenu = page.locator(`${idDropdown} div.ant-select-dropdown`);
        await page.waitForSelector(`${idDropdown} div.ant-select-dropdown`,{state: 'attached',timeout:6000});
        await dropdownMenu.waitFor({state:'visible',timeout: 7000});

      ///step 3: wait listvalue in dropdown_menu make sure visible 
        const listVaule = page.locator(`${idDropdown} div.ant-select-item-option[title ="${option}"]`);
        await listVaule.waitFor({state:'visible',timeout:7000});
        await listVaule.click({force:true});

      //step 4: after selectitem make sure the value realy visible 
        const itemSelected = page.locator(`${idDropdown} span.ant-select-selection-item[title="${option}"]`);
        await itemSelected.waitFor({state: 'visible', timeout:500})
      

      //step 5: click out side to close dropdown
        await page.locator('body').click();

        const SubScoreText = await itemSelected.innerText();

        const selectedScore = parseFloat(SubScoreText); // Chuyển về số thực
        const actualSubScore = parseFloat(subScorefn(selectedScore)).toString();

        console.log(`các giá trị được của dropdown ${idDropdown} là ${actualSubScore}`); // Đảm bảo trả về số
        await expect(page.locator(expectedSubScore)).toHaveText(actualSubScore);
        return actualSubScore;

    }
   
     
    let value:number[] =[]
    for (const selectValue of evaluateValues) {
     const sumValue = await selectAllCriteria(page,selectValue.idDropdown,selectValue.option,selectValue.subScore,selectValue.expectedSubScore);
    
     value.push(parseFloat(sumValue));
    }
    
    const [v1,v2,v3,v4] = value;

    const finalValue = (v1) +(v2+v3)*0.5 + (v4)*0.1
    const roundValue = Math.round((finalValue + Number.EPSILON)*100)/100

    console.log(`giá trị sum là ${roundValue}`)


    const paScore = await page.locator('div.card__score--value.bad > div').textContent();
    console.log(`PA Score ${paScore}`);

    await expect(page.locator('div').filter({ hasText: roundValue.toString() }).nth(1)).toContainText(roundValue.toString());
           

     });
    });





