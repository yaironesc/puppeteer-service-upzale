const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/render', async (req, res) => {
  const {
    url,
    format = 'jpeg',
    width = 1080,
    height = 1920,
    quality = 90,
    wait = 'networkidle0'
  } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'url requerida' });
  }

  const allowedFormats = ['jpeg', 'png', 'webp'];
  if (!allowedFormats.includes(format)) {
    return res.status(400).json({ error: 'formato no soportado' });
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: parseInt(width),
      height: parseInt(height),
      deviceScaleFactor: 2
    });

    await page.goto(url, {
      waitUntil: wait,
      timeout: 60000
    });

    const options = {
      type: format,
      fullPage: false
    };

    if (format !== 'png') {
      options.quality = parseInt(quality);
    }

    const buffer = await page.screenshot(options);

    await browser.close();

    res.setHeader('Content-Type', `image/${format}`);
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Error renderizando imagen',
      message: err.message
    });
  }
});

app.listen(3000, () => {
  console.log('Puppeteer render service listo en puerto 3000');
});
