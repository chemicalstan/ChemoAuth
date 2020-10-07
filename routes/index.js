let express = require('express');
let router = express.Router()

router.get('/', (req, res)=>{res.render('welcome')})
router.get('/dashboard', (req, res)=>{res.render('dashboard')})
    
module.exports = router