const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const cors = require("cors");
require('dotenv').config();
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
const app = express();
const port = 4500;

app.use(express.json());
app.use(cors());


app.post('/shayari', async (req, res) => {
    let keyword = req.query.keyword;

    try {
        const runPrompt = async () => {
            const prompt = `Write a shayari on ${keyword} in hindi`;

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 500,
                temperature: 1,
            });
            const generatedShayari = response.data.choices[0].text;

            return generatedShayari
        };

        const shayari = await runPrompt(); // Wait for the shayari generation to complete
        res.json({ shayari }); // Send the shayari as a JSON response
    }
    catch (err) {
        res.send(err);
    }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

