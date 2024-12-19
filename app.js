const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 25565;

app.get('/track/:trackingNumber', async (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    const trackingUrl = `https://th.kerryexpress.com/th/track/?track=${trackingNumber}`;

    try {
        console.log(`Starting browser to fetch tracking information for ${trackingNumber}`);
        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        console.log(`Navigating to URL: ${trackingUrl}`);
        await page.goto(trackingUrl, { waitUntil: 'networkidle2' });

        console.log('Clicking search button...');
        await page.click('.ke-btn-search');

        console.log('Waiting for the tracking details to load...');
        await page.waitForSelector('kett-tracking-item-status', { timeout: 60000 });

        const content = await page.content();
        const $ = cheerio.load(content);

        // Log entire page content for debugging
        console.log('Page content loaded.');

        const estimatedDeliveryDate = $('.text-1430:contains("กำหนดส่ง")').first().text().replace("กำหนดส่ง : ", "").trim();
        console.log(`Estimated Delivery Date: ${estimatedDeliveryDate}`);

        const sender = $('.text-1424.light:contains("จาก:")').first().next().text().trim();
        console.log(`Sender: ${sender}`);

        const receiver = $('.text-1424.light:contains("ถึง:")').first().next().text().trim();
        console.log(`Receiver: ${receiver}`);

        let info = [];
        $('li.status-line').each((i, elem) => {
            const description = $(elem).find('.header.bold').text().trim();
            const location = $(elem).find('.light.ng-star-inserted').text().trim();
            const dateElem = $(elem).find('.text-sm-right span').eq(0).text().replace("วันที่ ", "").trim();
            const timeElem = $(elem).find('.text-sm-right span').eq(1).text().replace("เวลา ", "").trim();
            if (dateElem || timeElem || location || description) {
                info.push({ date: dateElem, time: timeElem, description, location });
            }
        });

        console.log('Tracking Info:', info);

        await browser.close();

        res.json({
            'กำหนดส่ง': estimatedDeliveryDate,
            'ผู้ส่ง': sender,
            'ผู้รับ': receiver,
            'info': info
        });

    } catch (error) {
        console.error('Error occurred while fetching tracking information:', error);
        res.status(500).send('Error occurred while fetching tracking information');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
