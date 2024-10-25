const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const APIRoutes = require('./Routes')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Servidor Node.js en http://localhost:${port}`);
});

app.use('/api',APIRoutes);