import {test as t1} from '@playwright/test';
//import { test as t2 } from '../pom/login.page';
import { test as t2 } from '../fixture/overview.fixture';
import { mergeTests} from '@playwright/test';

export const test = mergeTests(t1, t2);

