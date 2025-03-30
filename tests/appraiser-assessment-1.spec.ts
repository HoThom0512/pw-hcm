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

        const selectedItem = page.locator(`${idDropdown}`);
        await selectedItem.waitFor();
        //await selectedItem.hover();
        await selectedItem.click({force:true});


        const dropdownMenu = page.locator(`${idDropdown} div.ant-select-dropdown`);
        await dropdownMenu.waitFor({state:'attached'})
        await dropdownMenu.waitFor({state:'visible'});
        await page.locator(`${idDropdown} div.ant-select-item-option[title ="${option}"]`).click({force:true});
        await page.locator('body').click();

        const SubScoreText = await selectedItem.innerText();

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
   // console.log(`giá trị value ${value}`);
    const finalValue = (v1) +(v2+v3)*0.5 + (v4)*0.1
    const roundValue = Math.round((finalValue + Number.EPSILON)*100)/100

    console.log(`giá trị sum là ${roundValue}`)
    const actualFinal = await page.locator('div').filter({ hasText: roundValue.toString() }).nth(1).innerText();
    console.log(` PA score ${actualFinal}`);

    await expect(page.locator('div').filter({ hasText: roundValue.toString() }).nth(1)).toContainText(roundValue.toString());
           

     });
    });





