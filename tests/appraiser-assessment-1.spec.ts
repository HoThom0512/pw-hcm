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

        await test.step('Step 3 Appraiser evaluate score', async () => {

           type ScoreItem ={
            idDropdown: string;
            value: string;
            caculationSubScore: (selectValue: number) =>string; 
            locatorExpectScore: (page:any) => any;
           }

            const listScore: ScoreItem[] =[
                
                {
                    idDropdown:'[id="demo-select-performances\\.0\\.score"]',
                    value: '2',
                    caculationSubScore: (selectValue) => (selectValue*0.5).toFixed(2),
                    locatorExpectScore: (page) => page.locator('.ant-col > .ant-table-wrapper > div > div > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > tr:nth-child(2) > td:nth-child(8)'),
                    //locatorlist: (page) => page.getByTitle('3', { exact: true }).locator('div'),
                    //caculationSubScore: (selectValue) => (selectValue*0.5).toFixed(2),
                    //locatorExpectScore: (page) => page.locator('.ant-col > .ant-table-wrapper > div > div > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > tr:nth-child(2) > td:nth-child(8)'),


                },

                {
                    idDropdown: '[id="demo-select-performances\\.2\\.score"]',
                    value: '2.5',
                    caculationSubScore: (selectValue) => (selectValue*0.3).toFixed(2),
                    locatorExpectScore: (page) => page.locator('tr:nth-child(4) > td:nth-child(8)'),
                    /*locatorlist: (page)=>page.locator('[id="demo-select-performances\\.2\\.score"]').getByText('2.5'),
                    caculationSubScore: (selectValue) => (selectValue*0.3).toFixed(2),
                    locatorExpectScore: (page) => page.locator('tr:nth-child(4) > td:nth-child(8)'),*/

                },
                {
                    idDropdown: '[id="demo-select-performances\\.3\\.score"]',
                    value: '3',
                    caculationSubScore: (selectValue) => (selectValue*0.7).toFixed(2),
                    locatorExpectScore: (page) => page.locator('tr:nth-child(5) > td:nth-child(8)'),
                    /*locatorlist:(page)=> page.locator('[id="demo-select-performances\\.3\\.score"]').getByText('2.5').nth(2),
                    caculationSubScore: (selectValue) => (selectValue*0.7).toFixed(2),
                    locatorExpectScore: (page) => page.locator('tr:nth-child(5) > td:nth-child(8)')*/

                },
                {
                    idDropdown:'[id="demo-select-performances\\.5\\.score"]',
                    value: '0.5',
                    caculationSubScore: (selectValue) => (-1*selectValue*1).toFixed(2),
                    locatorExpectScore: (page) => page.locator('tr:nth-child(7) > td:nth-child(8)'),
                    /*locatorlist:(page)=> page.locator('[id="demo-select-performances\\.5\\.score"]').getByText('0.5', { exact: true }).nth(4),
                    caculationSubScore: (selectValue) => (-1*selectValue*1).toFixed(2),
                    locatorExpectScore: (page) => page.locator('tr:nth-child(7) > td:nth-child(8)'),*/

                }


            ];

            async function selectAllValue(page,idDropdown,value,caculationSubScore,locatorExpectScore) {
              
                await page.locator(`${idDropdown}`).click()
                await page.waitForSelector(`${idDropdown} .ant-select-dropdown`, { state: 'attached' });
                await page.locator(`${idDropdown} div.ant-select-item-option[title= ${value}]`).click({force:true});
                await page.locator('body').click();
                
                
                
                
                
                
                /*const dropdown = page.locator(idDropdown);
                await dropdown.waitFor({state:'visible'});
                await dropdown.click();
                

                const option = locatorlist(page);
                await option.waitFor(); // 🔥 Chờ option xuất hiện trước khi click
                await option.click();
                      

                await page.locator('body').click();
            
                const selectedValue = parseFloat(await dropdown.innerText());

                console.log(`Dropdown ${idDropdown} được chọn với giá trị: ${selectedValue}`);
                return selectedValue;*/
            }



           
          
                
            /*let value: number[]=[];
            
            for (const item of listScore) {
             const dropdownValue=  await selectAllValue(page,item.idDropdown,item.locatorlist,item.caculationSubScore,item.locatorExpectScore);
             
            value.push(parseFloat(item.caculationSubScore(dropdownValue)));
            
            }
            console.log(value);
         
            const [vl1,vl2,vl3,vl4] = value
             const sumValues = (vl1) + (vl2+vl3)*0.5 + (vl4)*0.1 
             const finalSum = Math.round((sumValues + Number.EPSILON) * 100) / 100; 
             console.log(`giá trị final ${finalSum}`)

             const actualvalue = await page.locator('div').filter({ hasText: finalSum.toString() }).nth(1).innerText();
             const extractedNumber = actualvalue.match(/\d+(\.\d+)?/g); // Lấy tất cả các số từ text
             console.log("Extracted PA Score:", extractedNumber);

             await expect(page.locator('div').filter({ hasText: finalSum.toString() }).nth(1)).toContainText(finalSum.toString());
            
            
            
            
            
            
             /*await test.step('Step 5 click Save button', async()=>{

             await page.locator('#demo-select-performances\\.0\\.score').click();
             await page.waitForSelector('.ant-select-dropdown', { state: 'attached' });
             await page.locator('#demo-select-performances\\.0\\.score div.ant-select-item-option[title="1"]').click({force:true});
          
            await page.click('body');

             await page.locator('#demo-select-performances\\.2\\.score').click();
             await page.waitForSelector('.ant-select-dropdown', { state: 'attached' });
             await page.locator('#demo-select-performances\\.2\\.score div.ant-select-item-option[title="3"]').click({force:true});
             */



            //await page.getByRole('button', { name: 'Save' }).click();
            
       

            });

        });

    
    });
