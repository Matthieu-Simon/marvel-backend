require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.MARVEL_API_KEY;

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello Marvel"});
});

app.get('/characters',  async (req, res) => {
    try {
        // console.log(req.query);
        // const name = req.query.name || "";
        const limit = req.query.limit || 100;
        const skip = req.query.skip || 0;
        
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&limit=${limit}&skip=${skip}`);

        // console.log(response.data);
        res.json(response.data)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/comics', async (req, res) => {
    try {
        const limit = req.query.limit || 100;
        const skip = req.query.skip || 0;

        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}`);
        // console.log(response.data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/comics/:characterId', async (req, res) => {
    try {
        // console.log(req.params.characterId);
        const characterId = req.params.characterId;
        // console.log("result", characterId);

        const skip = req.query.skip || 0;
        
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}&skip=${skip}`);
        // console.log(response.data);
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.all('*', (req, res) => {
    res.status(500).json({ message: error.message });
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});