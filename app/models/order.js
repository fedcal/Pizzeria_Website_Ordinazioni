const mongoose=require('mongoose')

const Schema= mongoose.Schema

const orderSchema =new Schema({
    nameOrder: { type: String, required:true },
    customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
    },

    items: { type: Object, required: true },
    phone: { type: String, required: true},
    note: { type: String, required: false},
    date: { type: String, required: true},
    ora: { type: String, required: true},
    paymentType: { type: String, default: 'COD'},
    status: { type: String, default: 'order_placed'},
}, { timestamps: true})



module.exports=mongoose.model('Order',orderSchema)