const express = require('express')
const ProductManager = require('./ProductManager.js')

const app = express()
const PORT = 8000
app.use(express.urlencoded({extended: true}))
app.use(express.json())

let prueba1 = new ProductManager("../Productos.json")

app.get('/products', (req,res)=>{
    let todosP = prueba1.getProducts().then((rta)=>{return res.json(rta)}) // si acá le pongo return console.log(rta) se me muestra bien 
    //nose porque acá me deja solo si pongo el res dentro de la promesa, y no me deja poner el res.json(todosP) fuera de la promesa
    .catch((e)=>console.log("Se produjo un error al mostrar todos los productos: " + e))
})

app.get('/products/:id', (req,res)=>{
    let idParametro = req.params.id
    console.log(idParametro)
    let existe = prueba1.getProductById(idParametro)
    console.log("existe: "+existe)
    if(existe.length>0){
        res.send(existe)
    }else{
        res.send("No existe el producto")
    }
})

app.listen(PORT, ()=>{
    console.log("Servidor funcionando: " + PORT)
})