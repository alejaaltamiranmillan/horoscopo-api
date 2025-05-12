const express = require('express');
const cors = require('cors');
const horoscopes = require('../data/horoscopes');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET']
}));

app.get('/api/horoscope', (req, res) => {
    const { sign } = req.query;

    // Normalizar el signo recibido para eliminar tildes y convertir a minúsculas
    const signoNormalizado = sign.toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (!signoNormalizado || !horoscopes[signoNormalizado]) {
        return res.status(400).json({
            error: 'Signo zodiacal no válido'
        });
    }

    const horoscopeArray = horoscopes[signoNormalizado];
    const randomIndex = Math.floor(Math.random() * horoscopeArray.length);

    res.json({
        sign: signoNormalizado,
        horoscope: horoscopeArray[randomIndex]
    });
});

module.exports = app;