const LocalStrategy = require('passport-local'),
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

// Load user model
const User = require('../models/User');

// Export Strategy
module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done)=>{
            // Match User
            User.findOne({email: email})
                .then(user=>{
                    if(!user){
                        return done(null, false, { message: 'This email is not registered' })
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if(err) throw err;
                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                })
                .catch(err=>console.log(err));
        })
    );

    //  Create Login sessions
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(null, user)
        })
    })
}
