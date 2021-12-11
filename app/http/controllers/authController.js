const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    return{
        login(req, res){
            res.render('auth/login')
        },
        postLogin(req,res,next){
            passport.authenticate('local', (err, user, info) =>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('login')
                }
                req.login(user, () => {
                    if(err){
                        
                    }
                })
            })
        },
        registrazione(req, res){
            res.render('auth/register')
        },
        async postRegistrazione(req,res){
            const { name, email, password } = req.body //Questi campi devo combaciare con il nome dei campi input del form register
            if(!name || !email || !password){
                req.flash('error', 'Tutti i campi sono richiesti')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/registrazione')
            }

             User.exists({ email: email }, (err, result) => {
                if(result){
                    req.flash('error', 'Email già presente')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/registrazione')
                }
             })

             const hashedPassword= await bcrypt.hash(password, 10)

             const user = new User({
                 name,
                 email,
                 password: hashedPassword
             })

             user.save().then((user) => {
                //Login

                return res.redirect('/')
             }).catch(err => {
                req.flash('error', 'Qualcosa è andato storto')
                return res.redirect('register')
             })

            console.log(req.body)
        }
    }
}

module.exports= authController