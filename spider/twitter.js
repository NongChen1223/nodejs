import {launch} from 'puppeteer'

function getTwitterSpider() {
    return new Promise(async (yes, no) => {
        const baseUrl = 'https://twitter.com/ChainingView'
        const browser = await launch()
        const page = await browser.newPage()
        await page.goto(baseUrl)
        const textSelector = await page.waitForSelector('[data-testid="UserProfileSchema-test"]');
        const fullTitle = await textSelector?.evaluate(el => el.textContent);
        // console.log('fullTitle!!',fullTitle)
        if (fullTitle) {
            const content = JSON.parse(fullTitle)
            // console.log('转换后', content?.author?.interactionStatistic[0]?.userInteractionCount)
            const count = content?.author?.interactionStatistic[0]?.userInteractionCount
            if(count){
                yes(count)
            }else {
                no('get getTwitterSpider error')
            }
        }
        no('get getTwitterSpider error')
    })
}
getTwitterSpider().then(res=>{
    console.log('查询结果 res', res)
    // return res
}).catch(err=>{
    console.log('查询结果 err', err)
    // return err
})
// console.log('查询结果', res)