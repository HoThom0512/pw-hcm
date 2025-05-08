import {test as t1} from '@playwright/test';
import {test as t2} from './admin.overview.fixture';
import {test as t3} from './user.thom-ho.overview.fixture';
import {test as t4} from './ap.overview.fixture';
import {test as t5} from './dh.overview.fixture';
import {test as t6} from './user.oanh-truong.overview.fixture'
import { mergeTests } from '@playwright/test';
export const test = mergeTests (t1,t2,t3,t4,t5,t6);
