import { type } from 'os';
import { Page, Locator } from 'playwright';
import { expect } from 'playwright/test';

/**
 * @param locatorComment - locator của comment dropdown
 * @param comment - comment của dropdown
 * 
 * 
 * */

type fillComment = {

    locatorComment: string;
    comment: string;

}

export async function fillCommentDropdown ({locatorComment,comment}:fillComment):Promise<string> {


return comment

}