const express = require('express') // crear la constante del server
const routes = express.Router() // usar una parte del express (.Router)

// route for select-----------------------
routes.get('/:table',(req,res)=>{//obtener mediante / un requerimiento y una respuesta
    //res.send('ahora si viene el select')
    req.getConnection((err,conn)=>{ //conexion a la base de datos (error,mensaje)
        
        if(err)return res.send(err) // retornar el error en caso de que llegue
        var ssql='select * from '+req.params.table
        conn.query(ssql,(err,rows)=>{//realizar la peticion de filas de la tabla
            if(err)return res.send(err)

            res.json(rows)
        })
    })
})

// route for insert----------------------
routes.post('/:table',(req,res)=>{//obtener mediante / un requerimiento y una respuesta
    //res.send('ahora si viene el select')
    req.getConnection((err,conn)=>{ //conexion a la base de datos (error,mensaje)
        
        if(err)return res.send(err) // retornar el error en caso de que llegue
        var ssql='INSERT INTO '+req.params.table +' SET ?'
        conn.query(ssql,[req.body],(err,rows)=>{//realizar INSERT [contenido]
            if(err)return res.send(err)

            res.send('Add OK..')
        })
    })
})

////route for delete--------------------
routes.delete('/:table/:field/:prod_id',(req,res)=>{//obtener mediante / un requerimiento y una respuesta
    
    req.getConnection((err,conn)=>{ //conexion a la base de datos (error,mensaje)
        
        if(err)return res.send(err) // retornar el error en caso de que llegue
        var ssql='DELETE FROM ' + req.params.table + ' WHERE ' + req.params.field + ' = ?'
        conn.query(ssql,[req.params.prod_id],(err,rows)=>{//realizar delete [contenido]
            if(err)return res.send(err)

            res.send('Book deleted OK..')
        })
    })
})

////route for update----------------------------------
routes.put('/:table/:field/:prod_id',(req,res)=>{//obtener mediante / un requerimiento y una respuesta
    
    req.getConnection((err,conn)=>{ //conexion a la base de datos (error,mensaje)
        
        if(err)return res.send(err) // retornar el error en caso de que llegue
        var ssql='UPDATE ' + req.params.table + ' set ? WHERE ' + req.params.field + ' = ?'
        conn.query(ssql,[req.body,req.params.prod_id],(err,rows)=>{//realizar EDIT [contenido]
            if(err)return res.send(err)

            res.send('Book updated OK..')
        })
    })
})

// route for select----------------------- get para obtener el numero mayor
routes.get('/:table/:field',(req,res)=>{//obtener mediante / un requerimiento y una respuesta
    req.getConnection((err,conn)=>{ //conexion a la base de datos (error,mensaje)
        if(err)return res.send(err) // retornar el error en caso de que llegue
        var ssql='select MAX('+ req.params.field +') from ' + req.params.table
        conn.query(ssql,(err,rows)=>{//realizar la peticion de filas de la tabla
            if(err)return res.send(err)

            res.json(rows)
        })
    })
})


module.exports=routes // enviar la variable con el mensaje al server