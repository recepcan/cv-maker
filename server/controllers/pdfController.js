// src/controllers/pdfController.js
import puppeteer from 'puppeteer';

// PDF oluşturma işlemi
export const createPDF = async (req, res) => {
  const { htmlContent } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    

    // Tailwind CSS CDN bağlantısını HTML içeriğine ekleyin
    const modifiedHtmlContent = `
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>${htmlContent}</body>
    `;

    console.log(htmlContent,"htmlContent")

    // HTML içeriğini Puppeteer sayfasına yükleyin
    await page.setContent(modifiedHtmlContent, { waitUntil: 'domcontentloaded' });

    // PDF oluştur
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    // PDF'i istemciye gönder
    res.contentType('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF oluşturulurken bir hata oluştu:', error);
    res.status(500).json({ error: 'PDF oluşturulurken bir hata oluştu.' });
  }
};
