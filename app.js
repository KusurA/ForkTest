const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config({path: './.env'});

const app = express();//with app u start a server


//create connection with the server
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

const publicDirectory = path.join(__dirname, './public') //given u the name of directory where u at
app.use(express.static(publicDirectory))//make sure that the app uses the path file 

app.use(express.urlencoded({extended: false}));//parse url encoded bodies (sent by html forms)
//parse json bodies as sent by api clients
app.use(express.json());

app.use(cookieParser());


app.set('view engine', 'hbs');//engine hbs for viewing the page, first the folder, then the file (hbs - handle bar files)

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('mysql connected')
    }
});

//Define routes
app.use('/', require('./routes/pages')); //this makes it possible to access our routes, that are defined in pages.js
app.use('/auth', require('./routes/auth'));



app.listen(3000, () => {
    console.log('server started on port 3000')
})