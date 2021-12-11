const LocalStrategy = require ('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require ('bcrypt')


 function init(passport){
    passport.use(new LocalStrategy({ usernameField:'email' }, async (email, password, done) => {
        //Cotrolliamo se la mail esiste
        const user = await User.findOne({ email: email })
        if(!user){
            return done(null, false, { message: 'Nessun utente con questa mail'})
        }
        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, {message: 'Accesso riuscito'})
            }
            return done(null, false, {message: 'Nome o passworf sbagliate'})
        }).catch(err => {
            return done(null, false, { message: 'Qualcosa è andato storto' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)

        })
    })

    

}

module.exports = init