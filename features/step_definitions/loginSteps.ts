import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;

Given('I open the login page', async function () {
  browser = await chromium.launch({ headless: false }); // Chạy trong chế độ không headless để xem thao tác
  page = await browser.newPage();
  await page.goto('https://your-login-page-url.com', { timeout: 30000 });  // Thay thế với URL của bạn
});

When('I submit valid credentials', async function () {
  await page.fill('input[name="username"]', 'your-username');  // Thay thế bằng thông tin hợp lệ
  await page.fill('input[name="password"]', 'your-password');  // Thay thế bằng thông tin hợp lệ
  await page.click('button[type="submit"]');
});

Then('I should see the homepage', async function () {
  // Kiểm tra sự tồn tại của một phần tử đặc trưng trên trang chủ (ví dụ: "Overview")
  await expect(page.locator('h1')).toHaveText('Welcome');
  await browser.close();
});
