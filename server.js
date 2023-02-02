const express=require('express') // añade a express las librerias descargadas y usar servidores
const mysql=require('mysql') // constante para usar los paquetes mysql instalados
const myconn=require('express-myconnection')// constante para crear conexion a repositorio o base de datos
const routes=require('./routes')//toma la variable de route.js
const cors = require('cors')// toma el cors instalado

const app=express() // crear el constructor e instanciar a la variable
app.use(cors())// usa la variable cors

app.set('port',9001)// definir el puerto

const dbOptions={// configuracion para conectar a la base de datos
    host:'localhost',
    port:'3306',
    user:'prueba',
    password:'prueba',
    database:'db2022'
}

//middelwares (porceso intermedio entre una conexion y una respuesta)
app.use(myconn(mysql,dbOptions,'single'))//usar el express para conecar con myconn (db, config de db,tipo de conexion)
app.use(express.json())// formato de entrega y recepcion

// rutas -----
app.get('/',(req,res)=>{
    res.send('welcome to my APP')
})

app.use('/api',routes)//acceder mediante /api a la informacion guardada en 'routes'



app.listen(app.get('port'),()=>{// escuchar el puerto, funcion tipo flecha
    console.log(`server running to ${app.get('port')}`)
})