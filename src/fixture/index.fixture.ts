import {test as t1} from '@playwright/test';
import {test as t2} from './overviewpage.fixture'
import { mergeTests } from '@playwright/test';
export const test = mergeTests (t1,t2);