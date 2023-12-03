require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const mysql = require("mysql");
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

const cors = require('cors');
var corsOptions = {
    origin: "http://localhost:3000"
};
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to cs222-team46 application." });
});

// Import routes and give the server access to them.
const routes = require('./routes/routes');
routes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
