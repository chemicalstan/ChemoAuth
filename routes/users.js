let express = require('express');
const { route } = require('.');
let router = express.Router();
// User Login
router.get('/login', (req, res)=>res.render('login'));
router.get('/register', (req, res)=>res.render('register'));
router.post('/register', (req, res)=>{
    // extract values from form
    const { name, email, password, password2 } = req.body;
    // initialize errors array
    const errors = []
    // form validation
    if (!name || !email || !password || !password2) {
        errors.push({ msg:'Please fill all fields' });
    };
    // check passwords
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    };
    // check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be more than six characters' })
    };

    // Parsing data to DB 
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        res.send('Pass');
    }
})

module.exports = router;