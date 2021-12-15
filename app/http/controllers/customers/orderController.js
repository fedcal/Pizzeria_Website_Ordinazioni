const Order = require('../../../models/order')
const User = require('../../../models/user')

const moment = require('moment')

function orderController () {
    return{
        store(req,res) {
            const { phone, note, date, ora } = req.body
            if( !phone || !date || !ora){
                req.flash('error', 'Inserire un recapito e la data e l\' ora di consegna')
                return res.redirect('/carrello')
            }

            req.user.n_order = req.user.n_order + 1
            let nOrder = req.user.n_order
            
            const users = User.findOneAndUpdate( { id: req.user._id }, { n_order: nOrder })


            const order = new Order({
                nameOrder: req.user.name+req.user.cognome+req.user.n_order,
                customerId: req.user._id,
                items: req.session.cart.items,
                dataOrdine: date,
                oraOrdine: ora,
                phone,
                note
            })

            order.save().then(result => {
                req.flash('success', 'Ordine effettuato con successo')
                delete req.session.cart
                return res.redirect('/cliente/ordini')

            }).catch(err =>{
                req.flash('error', 'Qualcosa è andato storto')
                return res.redirect('/carrello')
            })
        },

        async index(req, res) {
            const orders = await Order.find({ custmomerId: req.user._id }, null, { sort: { 'createdAt': -1} })
            res.render('customers/ordini',{ orders: orders, moment: moment})
        }

    }
}

module.exports = orderController