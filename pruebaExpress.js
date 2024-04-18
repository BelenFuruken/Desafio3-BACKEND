const express = require('express')
const app = express()
const PORT = 8080
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    let todosP = 
    res.send("hola")
})

app.listen(PORT, ()=>{
    console.log("Servidor funcionando: " + PORT)
})
