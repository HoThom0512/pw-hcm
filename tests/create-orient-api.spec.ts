import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';



/*test('step 1 login on HCM system', async({overviewpage,page,request}) =>{
  
  await test.step('Step 2 Navigate to Admin menu', async() =>{
  await page.locator('text = Admin').click();
  await expect(page.locator('a[href="/overview"]').nth(5)).toBeVisible();
  });

  await test.step('Step 3 navigate to Orient Management',async() =>{
  await page.getByText(/Category Management/).click();
  await expect(page.locator('text=Orientation Management')).toBeVisible();

  await page.getByText(/Orientation Management/).click();
  await expect(page.locator('h1[class="ant-typography sc-cEzcPc iZwFYj"]')).toHaveText('Orientation Management');

  });
*/
 test ('go to page create Orientation', async({request}) =>{
  const nameJobLevel = "NN26";
  const baseURL = "https://qa-nexthcm-api.banvien.com.vn/gatewayapp/users/levels";
    
  const bearToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqeTlxNWxUMjU1VVktc3o1M3JIRFFIOUF5dlB2cGV6Z25XQXJfNGNCVHhVIn0.eyJleHAiOjE3Mzc2MDIxMjQsImlhdCI6MTczNzUxNTcyNCwianRpIjoiNzVjNjIzOWUtMTgzNC00MTEwLWEwMWQtZjYxNDc2MjJlYjdkIiwiaXNzIjoiaHR0cDovL25leHRoY20ta2V5Y2xvYWs6ODA4MC9yZWFsbXMvaGNtLXFhIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjliZTBjNDYzLTFmMTctNDY3OC04MWI0LWZjYmYzYTVmNDM5YyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImhjbS1hY2NvdW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImQ5YjdhN2EwLWRkMmEtNGVkMy1hOWIxLTA2ZWFlNWU4MzZhNCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbmV4dGhjbS1rZXljbG9hazo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6ImQ5YjdhN2EwLWRkMmEtNGVkMy1hOWIxLTA2ZWFlNWU4MzZhNCIsIm9yZ1R5cGUiOiJMMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlRoYW5oIFNvbiBOZ3V5ZW4iLCJ0ZW5hbnRJZCI6IjJhNmIzYzQ2LWExNWUtNDRjZC1iMThlLTFhZTlmZWUzZmNjYSIsInByZWZlcnJlZF91c2VybmFtZSI6InNvbi5uZ3V5ZW4iLCJnaXZlbl9uYW1lIjoiVGhhbmggU29uIiwidXNlcklkIjoiOWJlMGM0NjMtMWYxNy00Njc4LTgxYjQtZmNiZjNhNWY0MzljIiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4iLCJvcmdJZCI6ImNjOTIxOGY4LTliYzctNDExYy1iM2RiLWM4NWQyZTUyNTBkYiIsImVtYWlsIjoic29uLm5ndXllbkBiYW52aWVuLmNvbS52biJ9.eLtUeA7pD-vPVedz-gk9-8cOeImq3J2-Tb-hHT9-jJs-GC29HXYI0MUnAdW8UTMZZ8cp_Pu30sn6zjh9o4nhh_yvlXTxJ5Vk4ONqQTdB8mPU5GsBeEzOGJk4PXhS1NXM0Z-Y1xfmVV_tcJMeXjRMZ9IDcLaO5SE4QFPGj4w11zGldL23y1MGEcmu7SxzuEbNHMmOa0KGhTYTuur7Inb6pvWugWudDHlXULbqMKIhIw_NdaJqroc70WzM7px4LG3D5RVlALykG4skmlg9sokmjvZVUBQS049b1iKJjFPlckAeJ5wFXAp7CJchVHla3yFnjuft2yViV9qyelT86tlfLQ'
//Post method 
    const postAPIJobLevel = await request.post(`${baseURL}`,{

    headers:{
        'Content-Type': 'application/json',
        'Authorization': bearToken
    },

    data:{
        name: nameJobLevel,
        description: "hello",
        
    },
    
    });
    /*if(!respon.ok){
      console.error(`error: ${respon.status} and ${respon.statusText}`)
      return;

    }*/
    const bodyJsonPost = await postAPIJobLevel.json();
    console.log(bodyJsonPost);

  await expect(postAPIJobLevel.status()).toEqual(200);
 });
// GET method 
 /*const getJobLevel = await request.get(`${baseURL}?sort=&page=0&size=10`,{

 headers: {
  'Authorization': bearToken
 },
 });
const getResponeJobLevel = await getJobLevel.json();
const listItemData = getResponeJobLevel.data.items;
console.log('get list job level',getResponeJobLevel);

expect(getJobLevel.status()).toEqual(200);
expect(Array.isArray(listItemData)).toBe(true);

const createJobLevel = listItemData.find(title => title.name === `${nameJobLevel}`);
expect(createJobLevel).toBeDefined();
const jobLevelID = createJobLevel.id;

console.log('get job level form post api',createJobLevel);

});
*/