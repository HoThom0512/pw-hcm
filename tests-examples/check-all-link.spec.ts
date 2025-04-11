import { link } from 'fs';
import {test} from '../src/fixture/index.fixture';
import {expect} from '@playwright/test';


test ('kiểm tra tất cả các link href không lỗi', async({page, overviewpage})=> {

    await page.goto('https://qa-nexthcm.banvien.com.vn/overview');

    /*const links = await page.$$eval('a[href]', anchors => 
        anchors.map(a => {
            if (a instanceof SVGAElement) {
                return a.href.baseVal; // Ép kiểu thành SVGAElement
            }
            return (a as HTMLAnchorElement).href; // Ép kiểu thành HTMLAnchorElement
        })
    );
    
    for (const link of links) {
        console.log(`Checking: ${link}`);
        const response = await page.request.get(link);
        expect(response.status()).toEqual(200); // Kiểm tra xem status code có nhỏ hơn 400 không
    }*/
// khai báo một đối tượng chứa các thuộc tính, svg, html,link
// khỏi tạo các biến count svg, html
// dùng map lặp qua các thẻ và if để kiểm tra thẻ svg và html 
// trả về giá trị 
//1. đếm số lương thẻ a là svg
//2.đếm số lương thẻ a là html 
// dùng call back function 

const { links, svgCount, htmlCount } = await page.$$eval('a[href]', anchors => {
    let svgCount = 0;
    let htmlCount = 0;

    const links = anchors.map(a => {
        if (a instanceof SVGAElement) {
            svgCount++;
            return (a as SVGAElement).href.baseVal; // SVG thẻ <a>
        }
        htmlCount++;
        return (a as HTMLAnchorElement).href; // HTML thẻ <a>
    });

    return { links, svgCount, htmlCount }; // Trả về kết quả
});

// Kiểm tra từng link
for (const link of links) {
    console.log(`Checking: ${link}`);
    const response = await page.request.get(link);
    expect(response.status()).toBeLessThan(400);
}
});






