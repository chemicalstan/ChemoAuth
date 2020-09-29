let express = require('express');
let router = express.Router();
// User Login
router.get('/login', (req, res)=>res.render('login'));
router.get('/register', (req, res)=>res.render('register'))

module.exports = router;