const Product = require('../models/productsModel')


const { getPostData } = require('../utills')

// @des Gets All Products
// @route GET /api/products
async function getProducts(req, res){
    try{
        const products = await Product.findAll()

        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(products)) 
    }catch(error){
        console.log(error)
    }
}


// @des Gets Single Products
// @route GET /api/products/:id
async function getProduct(req, res ,id){
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message : 'Product Not Found'})) 
            console.log('here')
        }else{
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify(product)) 
            console.log('here2')
        }
    }catch(error){
        console.log(error)
    }
}

// @des create a Products
// @route POST /api/products
async function createProduct(req, res){
    try{
        const body = await getPostData(req)

        const { title , description , price } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }

        const newProduct = await Product.create(product)
        res.writeHead(201, {'Content-Type' : 'application/json'})
        return res.end(JSON.stringify(newProduct))

    }catch(error){
        console.log(error)
    }
}

// @des update a Products
// @route PUT /api/products/ :id
async function updateProduct(req, res,id){
    try{
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message : 'Product Not Found'}))
        } else{
            const body = await getPostData(req)

            const { title , description , price } = JSON.parse(body)

            const productData = {
                title : title || product.title,
                description : description || product.description,
                price : price || product.price
            }

            const updateProduct = await Product.update(id, productData)

            res.writeHead(200, {'Content-Type' : 'application/json'})
            return res.end(JSON.stringify(updateProduct))
        }

    }catch(error){
        console.log(error)
    }
}


// @des Delete Single Products
// @route DELETE /api/products/:id
async function deleteProduct(req, res ,id){
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message : 'Product Not Found'})) 
        }else{
            await Product.remove(id)
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message : `Product ${id} removed`})) 
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}