import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')
initAdmin()

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1300,
            text:'Aggiunto nel carrello!',
            progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1300,
            text:'Qualcosa è andato storto!',
            progressBar: false
        }).show();
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})
 
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() => {
        alertMsg.remove()
    }, 1800)
}

