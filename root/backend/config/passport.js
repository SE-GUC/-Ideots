// const JwtStrategy = require('passport-jwt').Strategy
//  const ExtractJwt = require('passport-jwt').ExtractJwt
// //const mongoose = require('mongoose')
// //const tokenKey = require('./keys_dev').secretOrKey
const User =require('../models/User')
const bcrypt =require('bcryptjs');
// //-------------------------JWT PASSPORT-----------------------------------
// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'verysecretkey';
// // opts.issuer = 'accounts.examplesoft.com';
// // opts.audience = 'yoursite.net';
//------------------------------

const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, cb) => {
      const user = await User.findOne({email}).lean();
    if(!user) return cb(null, false, {message: 'Incorrect email or password.'});
   await bcrypt.compare(password ,user.password, function(err, res) {
        if(res) {
        //passwords match
          if (user.registrationPhase>=2)
          return   cb(null, user, {message: 'Logged In Successfully'});
          return   cb(null, false, {message: 'Email not verified yet'});
        } else {
         // Passwords don't match
         cb(null, false, {message: 'Incorrect email or password.'});
        } 
      }); 
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'verysecretkey'
    },
     async (jwtPayload, cb) => {

        //find the user in db if needed
        console.log(jwtPayload)
        let userId =jwtPayload.id
        console.log(jwtPayload.id)
        let user= await User.findOne({'_id':userId})
        console.log (user)
        if (user) return cb (null,user)
        return cb(null,false)   
        
        // .then(user => {
        //         return cb(null, user);
        //     })
        //     .catch(err => {
        //         return cb(err);
        //     });
    }
));