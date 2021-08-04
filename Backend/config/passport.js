const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const Admin = require('../models/Admin')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            Admin.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        return done(null, false)
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false)
                        }
                    })
                })
                .catch(error => console.log(error))
        })
    )
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, user) {
            done(err, user);
        });
    });
}