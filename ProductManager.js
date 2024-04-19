const { todo } = require('node:test')

const fs = require('fs').promises

class ProductManager{

    constructor(route){
        this.path = route
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        try{
            if(title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock ===""){
                console.log("Debe ingresar todos los campos requeridos!")
                return
            } 
            let products = await this.getProducts() 
            let exists = products.find((p)=>p.codigo === code)
            if(exists){
                console.log("Ya existe este codigo")
                return
            }else{
                let id = 1
                if(products.length>0){
                    id = products[products.length-1].id +1
                }
                products.push({
                    id: id,
                    nombre: title,
                    descrip: description,
                    precio: price,
                    img: thumbnail,
                    codigo: code,
                    cantidad: stock
                })
                await fs.writeFile(this.path, JSON.stringify(products, null, "\t"))
                console.log("Producto agregado correctamente")
                return
            } 
        }catch(error){
            console.log("Ocurrió un error al agregar el producto: " + error)
        }     
    }

    async getProducts(){
        try {
            const products = await fs.readFile(this.path, 'utf-8')
            if(products.length>0){
                //console.log(products)
                return JSON.parse(products)
                //return products
            }
            return []

        }catch(error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async getProductById(idJoin){
        try{
            let products = await this.getProducts()
            if(products.length>0){
                let productSearch = products.filter(p => p.id === idJoin)
                if(productSearch.length>0){
                    return productSearch
                }else{
                return error("No existe el producto")
                }
            }
            return console.log("Todavía no hay nigún producto")
        }catch(error){
            //console.log("Ocurrió un error al buscar el producto: " + error)
            return error
        }
    }

    async deleteProduct(idJoin){
        try{
        let products = await this.getProducts()
        let newList = products.filter(p => p.id !== idJoin)
        if(newList.length === products.length){
            return console.log("No existe el id ingresado")
        }
        await fs.writeFile(this.path, JSON.stringify(newList, null, "\t"))
        return console.log("Producto eliminado correctamente")
        }catch(eror){
            console.log("Ocurrió un error al borrar el producto: " + idJoin)
        }
    }

    async updateProduct(idActualizar, campoActualizar, nuevoValor){
        try{
        let products = await this.getProducts()
        let index = products.findIndex((p)=>p.id === idActualizar)
        if (index === -1){
            throw new Error("No existe el id seleccionado") 
        } 
        products[index][campoActualizar] = nuevoValor
        await fs.writeFile(this.path, JSON.stringify(products, null, "\t"))
        return products[index]
        }catch(error){
            console.log("Ocurrió un error al actualizar los datos: " + error)
        }
    }
}

module.exports = ProductManager