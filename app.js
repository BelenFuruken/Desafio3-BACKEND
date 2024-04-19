const express = require('express')
const ProductManager = require('./ProductManager.js')

const app = express()
const PORT = 8000
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const test1 = new ProductManager("Productos.json")

app.get('/products', async (req,res)=>{
    try{
        const allProducts = await test1.getProducts()
        if(req.query.limit){
            if(req.query.limit > allProducts.length-1){
                res.send("Valor ingresado inexistente. No hay "+req.query.limit+" productos.")
                return
            }
            res.send(allProducts.slice(0, req.query.limit)) 
            return
        }
        res.send(allProducts) 
    }catch(error){
        res.status(500).send("Ocurrió un error al actualizar los datos: " + error)
    }
    
})
app.get('/products/:id', async (req,res)=>{
    try{
        const idParam = parseInt(req.params.id) //poorque el parametro es string
        console.log(idParam)
        const exists = await test1.getProductById(idParam) 
        if(!exists.length>0){
            res.status(404).send("No existe el producto")
            return
        }
        res.send(exists)
    }catch(error){
        console.log("Ocurrió un error al actualizar los datos: " + error)
    }
    
})

app.listen(PORT, ()=>{
    console.log("Servidor funcionando: " + PORT)
})