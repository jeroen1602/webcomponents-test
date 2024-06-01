import puppeteer from 'puppeteer';
import express from 'express';

const app = express();
const port = 3000;
const repeatCount = 10;

app.use('/native', express.static('./native'));
app.use('/angular', express.static('./angular/dist/angular/browser/'));
app.use('/react', express.static('./react-components/build/'));
app.use('/vue', express.static('./vue/dist/'));

const server = app.listen(port, async () => {
    console.log('app has started!');

    const browser = await puppeteer.launch({
        headless: true,
    });
    await testPage(browser, 'native', repeatCount);
    await testPage(browser, 'angular', repeatCount);
    await testPage(browser, 'react', repeatCount);
    await testPage(browser, 'vue', repeatCount);

    await browser.close();
    server.close();
});


/**
 *
 * @param {Browser} browser
 * @param {string} path
 * @param {number} repeat
 */
async function testPage(browser, path, repeat = 100) {
    console.log(`Going to test path '${path}' with ${repeat} rounds`);
    const page = await browser.newPage();

    await page.goto(`http://localhost:${port}/${path}/`);
    await page.setViewport({width: 1280, height: 720});

    let total = 0;
    for (let i = 0; i < repeat; i++) {
        const time = await page.$('#time');

        const startText = await time.evaluate(el => el.textContent);
        await page.click('#start');

        while ((await time.evaluate(el => el.textContent)) === startText) {
            await new Promise(r => setTimeout(r, 100));
        }
        const timeTaken = parseInt(await time.evaluate(el => el.textContent));
        total += timeTaken / repeat;
        await page.reload();
    }
    console.log(`For path '${path}' average time taken was ${total} ms after ${repeat} rounds`);

    await page.close();

}

