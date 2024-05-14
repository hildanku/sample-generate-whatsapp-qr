const qrcode = require('qrcode');
const { Client } = require('whatsapp-web.js');
const express = require('express');
const app = express();
const port = 3000;

const client = new Client({
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
  });

// console.log(client);

    // ClientInfo: {
    //   wa_version,
    // },

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
        if (err) {
            console.error(err);
            return;
        }
        // Store the URL in a variable to serve it via the express server
        qrCodeUrl = url;
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});


client.initialize();

let qrCodeUrl = '';

// Serve the QR code at a specific endpoint
app.get('/qr', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>WhatsApp QR Code</title>
        </head>
        <body>
            <h1>Scan the QR code with WhatsApp</h1>
            <img src="${qrCodeUrl}" alt="QR Code" />
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
