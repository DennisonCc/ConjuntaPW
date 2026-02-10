const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor trabajando en el puerto ${PORT}`);
});
