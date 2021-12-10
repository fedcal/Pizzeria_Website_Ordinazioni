const User = require('../../models/user')

function authController(){
    return{
        login(req, res){
            res.render('auth/login')
        },
        registrazione(req, res){
            res.render('auth/register')
        },
        postRegistrazione(req,res){
            const { name, email, password } = req.body
            if(!name || !email || !password){
                req.flash('error', 'Tutti i campi sono richiesti')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/registrazione')
            }

             User.exists({ email: email }, (err, result)=>{
                if(result){
                    req.flash('error', 'Tutti i campi sono richiesti')
                    req.flash('name', name)
                    req.flash('email', email)
                }
             })

             const user = new User({
                 name: name,
                 email: email,
                 password: password
             })

            console.log(req.body)
        }
    }
}

module.exports= authController