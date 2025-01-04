import {test as base} from '@playwright/test';
import { LoginPage } from '../pom/login.page';
import { OverviewPage } from '../pom/overview.page';

const test  = base.extend<{oveviewpage: OverviewPage}> ({
    oveviewpage: async ({page}, use) =>{

        const overviewpage = new OverviewPage(page);
        await use(overviewpage)
    }
});

export{test}


