import { expect } from '@playwright/test';
import { parentPort } from 'worker_threads';
import { test } from '../src/fixture/index.fixture';


test('step 1 login on HCM system', async({apuseroverviewpage,page}) => {
    await test.step('step 2 navigate to Performance Assessemt',async()=>{
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Performance Assessment' }).click();
    });

    await test.step('step 3 click view icon', async()=>{
    page.getByRole('row', { name: 'Test ES Department SD' }).getByRole('img').nth(1).click();    
    await expect(page.getByText('Assessment Details')).toBeVisible();

    })
    await test.step('step 4 click Assessment Details tab', async()=>{
    

   await page.getByText('Assessment Details').click({force:true});
    //await tabDetail.waitFor({state:'visible'});
    //await tabDetail.click();

    await page.getByRole('textbox', { name: 'Search by name...' }).fill('Oanh');
    await expect(page.getByRole('cell', { name: 'TRUONG THI KIM OANH' })).toBeVisible();
    const image =await page.getByRole('row', { name: '1503002 TRUONG THI KIM OANH' }).getByRole('img').nth(2);

    
    await image.waitFor({state:'visible'});
    await image.click({force:true, timeout:60000});

   
    });

   await test.step('Step 5 Appraiser evalue for employee', async()=>{

    const listItem = [

     {idDroplist: '[id="demo-select-performances\\.0\\.score"]', 
     optionVal:(page) => page.locator('[id="demo-select-performances\\.0\\.score"]').getByText('2', { exact: true })
     }


     {idDroplist:'[id="demo-select-performances\\.2\\.score"]', 
     optionVal:(page)=>page.locator('[id="demo-select-performances\\.2\\.score"]').getByText('2.5', {exact: true})},
   

     {idDroplist:'[id="demo-select-performances\\.3\\.score"]',
      optionVal:(page)=>page.locator('[id="demo-select-performances\\.3\\.score"]').getByText('3', { exact: true })},
     
      {idDroplist:'[id="demo-select-performances\\.5\\.score"]', 
     optionVal:(page)=>page.locator('[id="demo-select-performances\\.5\\.score"]').getByText('0.5',{exact:true}).nth(1)},

    ]
 
    async function selectItems(page, idDroplist,optionVal){

     const dropdown = page.locator(idDroplist);
        await dropdown.waitFor({state:'visible'});
        await dropdown.click();


        const itemSelect= await optionVal(page);
        await itemSelect.waitFor({state:'attached'})
        await itemSelect.waitFor({state:'visible'});
        await itemSelect.click({timeout:60000});
    }
   
    for(const ListItems of listItem){
    await selectItems(page,ListItems.idDroplist,ListItems.optionVal);

    }
});
});



    
    









  
