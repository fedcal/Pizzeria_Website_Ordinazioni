const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middleware/guest')
const orderController = require('../app/http/controllers/customers/orderController')

function initRoutes(app){
   
    app.get('/', homeController().index)
    app.get('/carrello', cartController().cart)
    app.get('/login', guest, authController().login)
    app.get('/registrazione', guest, authController().registrazione)
    app.get('/cliente/ordini', orderController().index)

    app.post('/update-cart', cartController().update)
    app.post('/registrazione',authController().postRegistrazione)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)
    app.post('/orders',orderController().store)

}
module.exports=initRoutes 