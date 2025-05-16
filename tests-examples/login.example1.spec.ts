import {Page, expect} from '@playwright/test';
import { test } from '../src/fixture/index.fixture';


test ('login', async({roleUserThom,page})=> {

    const urlOverview = page.locator('a[href="/overview"]').nth(0);

    await expect(urlOverview).toHaveText('Overview');



});