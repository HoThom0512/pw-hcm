import { expect } from '@playwright/test';
import { test } from '../src/fixture/index.fixture';
import {request } from 'http';

// Step 1: login page
test.describe('Job Level API Automation', () => {
test('Create job level by API', async ({request}) => {

  // Step 2: Navigate to Performance Assessment
  /*await page.locator('text = Admin').click();
  await expect(page.locator('.ant-menu-submenu-title').nth(1)).toBeVisible();

  await page.locator('//a[text()="Category Management"]').click();
  await expect(page.locator('//a[text() ="Job Level Management"]')).toBeVisible();
  await page.locator('//a[text() ="Job Level Management"]').click();

//test ('Step 2 create a jpb level using API',async({request})=>{
*/

const nameJobLevel = "thomtest03";
const bearToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqeTlxNWxUMjU1VVktc3o1M3JIRFFIOUF5dlB2cGV6Z25XQXJfNGNCVHhVIn0.eyJleHAiOjE3MzcyNjAyMjIsImlhdCI6MTczNzE3MzgyMiwianRpIjoiNTRhNmU2MTctMDAxNy00MDI5LWJlM2UtMDRkMmRiZDNjNThlIiwiaXNzIjoiaHR0cDovL25leHRoY20ta2V5Y2xvYWs6ODA4MC9yZWFsbXMvaGNtLXFhIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjliZTBjNDYzLTFmMTctNDY3OC04MWI0LWZjYmYzYTVmNDM5YyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImhjbS1hY2NvdW50Iiwic2Vzc2lvbl9zdGF0ZSI6ImMxYTIxZGFlLTY5NWEtNGFlNC05ZGI5LTg5ZjFjODE1ZTkyNSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbmV4dGhjbS1rZXljbG9hazo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6ImMxYTIxZGFlLTY5NWEtNGFlNC05ZGI5LTg5ZjFjODE1ZTkyNSIsIm9yZ1R5cGUiOiJMMyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlRoYW5oIFNvbiBOZ3V5ZW4iLCJ0ZW5hbnRJZCI6IjJhNmIzYzQ2LWExNWUtNDRjZC1iMThlLTFhZTlmZWUzZmNjYSIsInByZWZlcnJlZF91c2VybmFtZSI6InNvbi5uZ3V5ZW4iLCJnaXZlbl9uYW1lIjoiVGhhbmggU29uIiwidXNlcklkIjoiOWJlMGM0NjMtMWYxNy00Njc4LTgxYjQtZmNiZjNhNWY0MzljIiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4iLCJvcmdJZCI6ImNjOTIxOGY4LTliYzctNDExYy1iM2RiLWM4NWQyZTUyNTBkYiIsImVtYWlsIjoic29uLm5ndXllbkBiYW52aWVuLmNvbS52biJ9.R1l_ayl3ORIDH5J_C6DeGczUD9Mq1T07ENHq8SYscE5qMgosb9tkFnewetYFor8hMVYqO6ZGu_M3hV245xt6RjMRKzlVmH_X6VWJiXIkR3mXlAudLJXFf4VODm7c9sENR8bytDVyPXTol_SYXGgxGKss3riWfX6zfFEjAv46KCq6boeZp_ENGnBahW8GQngBmktcCtr5oA5ypEot6fFAPuBchOOupg-qp_A9gIPy3Q-4mA3_nEP50gAwDS2LhonVpsbKsAlgl02dlulBB0VjM1xJpeQCO6smpE2UeII0UP8A1490l7tkbis4TO3ud0NzzaZTbY_fiEUYORwVfaYSaA';
const createRequestPost = await request.post('https://qa-nexthcm-api.banvien.com.vn/gatewayapp/users/levels',{

 headers: {
    'Authorization': `${bearToken}`,
    'Content-Type': 'application/json',
  },

  data:{
    description: "test",
    name: nameJobLevel
  }
});
const responeBody = await createRequestPost.json();
console.log (responeBody);
  await expect(responeBody.message).toEqual('OK');

const jobLevelID = responeBody.data?.id;
expect(jobLevelID).toBeDefined();

});

test('Get ID vừa tạo', async({request})=> {

const getIDLevel = await request.get(`
https://qa-nexthcm-api.banvien.com.vn/gatewayapp/users/levels/${jobLevelID}`,{

  headers: {
    'Authorization': `${bearToken}`,
    
  },
});

expect(getIDLevel.status()).toBe(200)
 const responseBodyGet = await getIDLevel.json();
    console.log('Get Response:', responseBodyGet);
    expect(responseBodyGet.data?.id).toBe(jobLevelID);
    expect(responseBodyGet.data?.name).toBe('thomtest03');
})



test('Delete the Job Level (DELETE)', async ({ request }) => {
  const deleteResponse = await request.delete(`https://qa-nexthcm-api.banvien.com.vn/gatewayapp/users/levels/${jobLevelID}`, {
    headers: {
      'Authorization': `${bearToken}`,
    },
  });

  // Kiểm tra HTTP status code
  expect(deleteResponse.status()).toBe(200);

  // Lấy và kiểm tra nội dung phản hồi
  const responseBody = await deleteResponse.json();
  console.log('Delete Response:', responseBody);
  expect(responseBody.code).toBe('CODE_SUCCESS');
});

// Test xác nhận xóa thành công
test('Confirm deletion of Job Level (GET)', async ({ request }) => {
  const confirmResponse = await request.get(`https://qa-nexthcm-api.banvien.com.vn/gatewayapp/users/levels/${jobLevelID}`, {
    headers: {
      'Authorization': `${bearToken}`,
    },
  });

// Kiểm tra HTTP status code trả về lỗi (404 hoặc tương tự)
expect(confirmResponse.status()).toBe(404);
const responseBodyDeleted = await confirmResponse.json();
console.log('Confirm Deletion Response:', responseBodyDeleted);

});
});