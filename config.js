require('dotenv').config()

const PORT = process.env.PORT || 3004 //tutorial


const port_server = process.env.PORT_SERVER || 3002
const port_db= process.env.PORT_DB
const user_db= process.env.USER_DB
const password_db = process.env.PASSWORD_DB
const name_db = process.env.NAME_DB
const host_db=process.env.HOST_DB

module.exports={
    port_server,
    port_db,
    user_db,
    password_db,
    name_db,
    host_db,
    PORT
} 