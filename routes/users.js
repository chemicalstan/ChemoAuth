const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

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
    // Validation Passed
      // check if user already exists
      User.findOne({ email: email })
        .then(user=>{
            if (user) {
                errors.push({msg: 'Email is already registered'})
                res.render('register', {errors, name, email, password, password2})
            }else {
                // Create new user and encrypt password
                const newUser = new User({
                    name,
                    email,
                    password
                });
               
                console.log(newUser);
                res.send('Hello bro')
            }
        })
    }
})

module.exports = router;