const express = require('express')
const Joi = require('joi')
const router = express.Router()
Joi.objectId = require('joi-objectid')(Joi)
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
 const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
//const tokenKey = require('./keys_dev').secretOrKey
const User =require('../../models/User')




router.post('/', passport.authenticate('jwt', {session: false}) ,async (req,res) => {
    console.log (req.user)


});




module.exports = router ; 