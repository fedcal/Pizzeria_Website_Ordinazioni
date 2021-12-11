const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app){
   
    app.get('/', homeController().index)
    app.get('/carrello', cartController().cart)
    app.get('/login', authController().login)
    app.get('/registrazione', authController().registrazione)

    app.post('/update-cart', cartController().update)
    app.post('/registrazione',authController().postRegistrazione)
    app.post('/login', authController().postLogin)
}
module.exports=initRoutes 