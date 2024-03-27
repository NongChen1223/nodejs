import {launch} from 'puppeteer'
import fs from "fs";
//初始化浏览器对象
async function initBrowser() {
    try {
        const browser = await launch({
            headless: false,
            args: ['--start-maximized']
        });
        const page = await browser.newPage();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待 1 秒钟
        const allTokenList = []
        const page_current = 1 //爬取前5页 指定页数
        for (let i = 1; i <= page_current; i++) {
            let path = `https://etherscan.io/tokens?p=${i}`
            const tokenList = await getWebElement(page,path)
            if(tokenList.length > 0){
                allTokenList.push(...tokenList)
            }
        }
        // console.log('allTokenList',allTokenList)
        return allTokenList

    }catch (err){
        console.log('initBrowser error!!!!', err)
    }
}

//获取节点
async function getWebElement(page,path) {
    const page_class = '.d-flex.align-items-center.gap-1.link-dark' //包含内容的节点
    try {
        await page.goto(path);
        await page.waitForSelector(page_class);//等待页面出现这些元素再开始获取dom
        const elements = await page.$$(page_class); //获取页面中所有元素 一般是50条
        const tokenList = await  resolverElement(elements)
        return tokenList
    }catch (err){
        console.log('getWebElement error!!!!', err)
    }
}

//解析节点
async function resolverElement(elements = []) {
    try {
        if (!elements || elements.length == 0) return []
        const tokensList = []
        //获取到节点后开始解析
        for (const element of elements) {
            const regex = /https:\/\/etherscan\.io\/token\/(.*)/;
            //token地址
            const hrefProperty = await element.getProperty('href');
            let hrefValue = await hrefProperty.jsonValue();
            hrefValue = hrefValue.match(regex)?.[1] //获取token地址 把前面的地址去掉
            //代币全称
            const tokenNameElement = await element.$('.hash-tag.text-truncate.fw-medium');
            const tokenSymbolElement = await element.$('.text-muted');
            //代币符号
            const tokenNameProperty = await tokenNameElement.getProperty('textContent');
            const tokenSymbolProperty = await tokenSymbolElement.getProperty('textContent');

            let tokenName = await tokenNameProperty.jsonValue();
            let tokenSymbol = await tokenSymbolProperty.jsonValue();
            tokenSymbol = tokenSymbol.replace(/[()]/g, ''); //去掉括号
            tokensList.push({
                name: tokenName,
                symbol: tokenSymbol,
                address: hrefValue
            })
        }
        return tokensList
    } catch (err) {
        console.log('resolverElement error!!!!', err)
    }
}

function deleteJS() {
    return new Promise(resolve => {
        fs.unlink("tokenlist.js", err => {
            if (err) {
                console.error(err);
                resolve(false);
            } else {
                console.log("delete dist.zip");
                resolve(true);
            }
        });
    });
}
//写入文件
function writeFile(list){
    const output = fs.createWriteStream("tokenlist.js");
    const dataString =`
        export const Tokens = ${JSON.stringify(list)}
    `
    output.write(dataString)
    output.end(()=>{
        console.log('数据写入成功')
    })
}
//开始爬虫
async function startSpider(){
    await  deleteJS()
    const list =  await  initBrowser()
    if(list.length > 0){
        writeFile(list)
    }
}
startSpider()
// (async () => {
//     const browser = await launch({
//         headless: false,
//         args: ['--start-maximized']
//     });
//     const page = await browser.newPage();
//     await new Promise(resolve => setTimeout(resolve, 1000)); // 等待 3 秒钟
//     await page.goto('https://etherscan.io/tokens?p=1');
//     await page.waitForSelector('.d-flex.align-items-center.gap-1.link-dark');//等待页面出现这些元素
//     const elements = await page.$$('.d-flex.align-items-center.gap-1.link-dark'); //获取所有元素
//     console.log('节点', elements.length)
//     const toeknAddress = []
//     for (const element of elements) {
//         //token地址
//         const regex = /https:\/\/etherscan\.io\/token\/(.*)/;
//         const hrefProperty = await element.getProperty('href');
//         let hrefValue = await hrefProperty.jsonValue();
//         hrefValue = hrefValue.match(regex)?.[1]
//         //代币全称
//         const tokenNameElement = await element.$('.hash-tag.text-truncate.fw-medium');
//         const tokenSymbolElement = await element.$('.text-muted');
//         //代币符号
//         const tokenNameProperty = await tokenNameElement.getProperty('textContent');
//         const tokenSymbolProperty = await tokenSymbolElement.getProperty('textContent');
//
//         let tokenName = await tokenNameProperty.jsonValue();
//         let tokenSymbol = await tokenSymbolProperty.jsonValue();
//         tokenSymbol = tokenSymbol.replace(/[()]/g, '');
//         console.log(`
//     代币名称：${tokenName},
//     代币符号：${tokenSymbol},
//     href: ${hrefValue}
//   `);
//     }
// })();