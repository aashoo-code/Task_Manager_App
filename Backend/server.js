const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');
const AuthRoute = require('./Routes/AuthRoute');
const ProductRoute = require('./Routes/ProductRoute');



const PORT = process.env.PORT || 3000;



// app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running');
});

app.use('/auth', AuthRoute);
app.use('/products', ProductRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
