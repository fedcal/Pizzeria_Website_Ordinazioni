function cartController(){
    return{
        cart(req, res){
            res.render('customers/carrello')
        }
    }
}

module.exports= cartController