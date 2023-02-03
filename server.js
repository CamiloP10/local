const express=require('express') // añade a express las librerias descargadas y usar servidores
const mysql=require('mysql2') // constante para usar los paquetes mysql instalados
const myconn=require('express-myconnection')// constante para crear conexion a repositorio o base de datos
const routes=require('./routes')//toma la variable de route.js
const cors = require('cors')// toma el cors instalado

const app=express() // crear el constructor e instanciar a la variable

const config = require('./config.js') // para las variables de entorno

app.use(cors())// usa la variable cors

app.set('port', config.port_server)// definir el puerto

const dbOptions={// configuracion para conectar a la base de datos
    // local host
    /*host:'localhost',
    port:'3306',
    user:'prueba',
    password:'prueba',
    database:'db2022'*/

    // con db en railway
    /*host:'containers-us-west-139.railway.app',
    port:'6545',
    user:'root',
    password:'NrpEhJPs3j4ZGIQ6loE3',
    database:'railway'*/

    // con variables de entorno
    host: config.host_db,
    port: config.port_db,
    user:config.user_db,
    password:config.password_db,
    database: config.name_db
} 

//middelwares (porceso intermedio entre una conexion y una respuesta)
app.use(myconn(mysql,dbOptions,'single'))//usar el express para conecar con myconn (db, config de db,tipo de conexion)
app.use(express.json())// formato de entrega y recepcion

// rutas -----
app.get('/',(req,res)=>{
    res.send('welcome to my APP')
})

app.use('/api',routes)//acceder mediante /api a la informacion guardada en 'routes'



//app.listen(app.get('port'),()=>{// escuchar el puerto, funcion tipo flecha
app.listen(process.env.port,()=>{// escuchar el puerto, funcion tipo flecha
    console.log(`server running to ${app.get('port')}`)
})