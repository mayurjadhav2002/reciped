const express = require('express');
const imageRoute = express();
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');
const { Readable } = require('stream');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

imageRoute.post('/uploadFile', upload.single('image'), async (req, res) => {
    try {
        const imgBBApiKey = 'b9e1f36f2767369532e64bacbf5ad60a';

        // Convert buffer to base64
        const base64Image = req.file.buffer.toString('base64');

        // Prepare form data for imgBB API
        const form = new FormData();
        form.append('image', base64Image);

        // Upload image to imgBB
        const imgBBResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, {
            method: 'POST',
            body: form,
            headers: {
                ...form.getHeaders(),
            },
        });

        const imgBBData = await imgBBResponse.json();

        // Respond with the imgBB API response
        const responseData = {
            success: imgBBData.success,
            file: {
                url: imgBBData.data.url,
                // Add any additional fields you want to store
            },
        };

        // Respond with the formatted data
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = imageRoute;
