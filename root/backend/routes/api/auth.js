const express = require('express')
const router  = express.Router()
const jwt = require('jsonwebtoken')
const User =require('../../models/User')
const passport = require('passport')

/* POST login. */
router.post('/login', (req, res, next) =>{

    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }

       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }

           // generate a signed son web token with the contents of user object and return it in the response

           const userId =user._id.toJSON()
           const token = jwt.sign(userId, 'verysecretkey');
           return res.json({userId, token});
        });
    })(req, res);
});
module.exports = router;