const{sequelize, Sequelize}=require('sequelize')
const sequelize = new Sequelize('virtual_sikshya_db','postgres','admin123',{
    host:'localhost',
    dialect :'postgres',
    port:5432,
    logging :false,
})
async  function testConnection(){
    try{
        await sequelize.authenticate();
        console.log('DB Connection Sucessful...........')
    }catch(error){
        console.error('Unable to connect.....',error)


    }
}
testConnection()
module.exports=sequelize;