const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const APIRoutes = require('./Routes')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Servidor Node.js en http://localhost:${port}`);
});

app.use('/api',APIRoutes);