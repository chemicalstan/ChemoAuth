let express = require('express');
let router = express.Router()
// welcome page
router.get('/', (req, res)=>{res.render('welcome')})
// dashboard
router.get('/dashboard', (req, res)=>{res.render('dashboard')})
    
module.exports = router