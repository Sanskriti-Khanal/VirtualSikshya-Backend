//Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/virtual_sikshya_db')
//Creating a server
const app = express();
//Creating a port
const PORT = process.env.PORT||5000;
//Creating a middle ware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exteded:true}));
app.get('/virtual_sikshya',virtual_sikshya_route);
//Running on PORT
app.listen(PORT,()=>{
    console.log(`Server Running on.......................PORT ${PORT}`)
})