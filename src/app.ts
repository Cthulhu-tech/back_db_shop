import { Categories } from './api/category/category'
import { Product } from './api/product/product'
import { AppDataSource } from './data-source'
import fileUpload from 'express-fileupload'
import { JwtUtils } from './utils/jwt/jwt'
import cookieParser from 'cookie-parser'
import { User } from './api/user/user'
import { Auth } from './api/auth/auth'
import { Cart } from './api/cart/cart'
import bodyParser from 'body-parser'
import express from 'express'

AppDataSource
.initialize()
.then(() => {

    const app = express()

    //img
    app.use('*/assets', express.static(__dirname + '/../public'))
    //
    
    app.use(fileUpload())
    app.use(cookieParser())
    app.use(bodyParser.json({limit: '30mb'}))
    app.use(bodyParser.urlencoded({ extended: false, limit: '30mb' }))
    app.use(require('cors')({origin: process.env.ORIGIN, credentials: true, optionSuccessStatus: 200, headers: "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"}))
    //

    const port = process.env.SERVER_PORT ?? '3000'

    // utils
    const jwt = new JwtUtils()
    //

    // api
    const cart = new Cart()
    const auth = new Auth()
    const user = new User()
    const product = new Product()
    const categories = new Categories()
    //

    // category api
    app.get('/categories', categories.getAllCategory)
    //

    // user api
    app.get('/users/:id', user.getInfo)
    app.post('/users', user.create)
    app.put('/users/:id', jwt.checkBearer, user.update)
    app.delete('/users/:id', jwt.checkBearer, user.delete)
    //

    // authentication api
    app.post('/token/login', auth.login)
    app.post('/token/logout', auth.logout)
    app.post('/token/refresh', auth.refresh)
    //

    // product api
    app.get('/product', jwt.checkBearer, product.getProductInUser)
    app.get('/product/:id', product.getProduct)
    app.post('/delayed', jwt.checkBearer, product.delayed)
    app.post('/product', jwt.checkBearer, product.cretate)
    app.put('/product/:id', jwt.checkBearer, product.update)
    app.delete('/product/:id', jwt.checkBearer, product.delete)
    //

    // cart api
    app.get('/cart', cart.getCart)
    app.put('/cart/:id', jwt.checkBearer, cart.update)
    //

    // start server
    app.listen(port, () => console.log(`Server listening on port ${port}`))
    //

})
.catch((error) => console.log(error))
