import {test as t1} from '@playwright/test';
import {test as t2} from './overview.fixture';
import {test as t3} from './user.overview.fixture';
import {test as t4} from './ap.overview.fixture';
import { mergeTests } from '@playwright/test';
export const test = mergeTests (t1,t2,t3,t4);
