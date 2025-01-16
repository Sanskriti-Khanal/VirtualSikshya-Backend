const{Datatypes} = require('sequelize');
const sequelize = require('../database/virtual_sikshya_db');
const virtual_sikshya = sequelize.define('virtual_sikshya',{
    id:{
        type:Datatypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:Datatypes.STRING,
        allowNull:false,
    },
    email:{
        type:Datatypes.STRING,
        allowNull:false,
        unique:true,
    },
    
})
module.exports=virtual_sikshya;