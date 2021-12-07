function authController(){
    return{
        login(req, res){
            res.render('auth/login')
        },
        registrazione(req, res){
            res.render('auth/register')
        }
    }
}

module.exports= authController