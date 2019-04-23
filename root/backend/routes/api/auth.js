const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const passport = require("passport");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Token = require("../../models/Token");
const bcrypt = require("bcryptjs");
const validator = require("../../validations/userValidations");
const smtpTransport = require("nodemailer-smtp-transport");
//const functions = require("firebase-functions");
//-------------------------------------------------------------(/* POST login. */)----------------------------------------------------------------------------------
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response

      const userId = user._id.toJSON();
      const payload = {
        id: userId,
        iat: Date().now / 1000
      };
      const token = jwt.sign(payload, "verysecretkey");
      return res.json({ userId, token });
    });
  })(req, res);
});
//-------------------------------------------------------------(/* POST confirm. */)----------------------------------------------------------------------------------

router.get("/confirmation/:token&&:email", async (req, res) => {
  //look for the token in our data base
  const matchedToken = await Token.findOne({ token: req.params.token });
  if (!matchedToken)
  return res.status(400).send({
      type: "not-verified",
      msg: "We were unable to find a valid token. Your token my have expired."
    });
    //found it??? go ahead activate the user
    const matchedUser = await User.findOne({
        _id: matchedToken.userId,
       // email: req.params.email
    });
    console.log(matchedToken.userId)
  if (!matchedUser)
    return res
      .status(400)
      .send({ msg: "We were unable to find a user for this token." });
  if (matchedUser.registrationPhase === 2)
    return res.status(400).send({
      type: "already-verified",
      msg: "This user has already been verified."
    });

const updatedUser= await User.updateOne({ _id: matchedToken.userId }, { registrationPhase: 2 });
  res.json({data:updatedUser})
    //res.status(200).json({updated})
});

//-------------------------------------------------------------(/* POST resend. */)----------------------------------------------------------------------------------
router.get("/resend?email", async (req, res) => {
  const ourUser = await User.findOne({ email: req.params.email });
  if (!ourUser)
    return res
      .status(400)
      .send({ msg: "We were unable to find a user with that email." });
  if (ourUser.registrationPhase === 2)
    return res
      .status(400)
      .send({ msg: "This account has already been verified. Please log in." });
  const token = await Token.create({
    userId: newUser._id,
    token: crypto.randomBytes(16).toString("hex")
  });
  if (!token) console.log("no token created");
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "lirtenhub19@gmail.com",
        pass: "LirtenHub@ideots2019"
      }
    })
  );

  const mailOptions = {
    from: "no-reply@lirtenHub.com",
    to: newUser.email,
    subject: "Account Verification Token",
    text:
      "Hello,\n\n" +
      "Please verify your account by clicking the link: \nhttp://" +
      req.headers.host +
      "/api/auth/confirmation/" +
      token.token +
      "&&"+
      newUser.email+
      ".\n"
  };

 const mail= await transporter.sendMail(mailOptions);

});

//-------------------------------------------------------------(/* POST register. */)----------------------------------------------------------------------------------

router.post("/register", async (req, res) => {
  try {
    //check no dublicates
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    const salt = bcrypt.genSaltSync(10);
    const passAfterHashing = bcrypt.hashSync(req.body.password, salt);
    const type = req.body.type;
    const isValidated = validator.createValidationMember(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    //create user in the database
    const newUser = await User.create({
      type: req.body.type,
      name: req.body.name,
      email: req.body.email,
      password: passAfterHashing,
      registrationPhase: 1
    });
    res.json({ msg: "User was created successfully", data: newUser });
    //create token in the data base
    const token = await Token.create({
      userId: newUser._id,
      token: crypto.randomBytes(16).toString("hex")
    });
    if (!token) console.log("no token created");
    //send the Email
    // const gmailEmail=functions.config().gmail.email
    // const gmailPassword=functions.config().gmail.password
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        // service: "Sendgrid",
        auth: {
          user: "lirtenhub19@gmail.com",
          pass: "LirtenHub@ideots2019"
          // user: process.env.SENDGRID_USERNAME,
          // pass: process.env.SENDGRID_PASSWORD
        }
      })
    );

//   let  transporter = nodemailer.createTransport({
//         host: "mail.lirtenhub.com",
//         port:25,//465, //587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: 'test@lirtenhub.com', // generated ethereal user
//           pass: '123abc' // generated ethereal password
//         },
//         tls:{
//             rejectUnauthorized:false
//         }
//       });
    const mailOptions = {
      from: "no-reply@lirtenHub.com",
      to: newUser.email,
      subject: "Account Verification Token",
      text:
        "Hello,\n\n" +
        "Please verify your account by clicking the link: \nhttp://" +
        req.headers.host +
        "/api/auth/confirmation/" +
        token.token +
        "&&"+
        newUser.email+
        ".\n"
    };

   const mail= await transporter.sendMail(mailOptions);

    // if (!mail) {
    //   return res.status(500).send({ msg: err.message });
    // } else {
    //   return res
    //     .status(200)
    //     .send("A verification email has been sent to " + newUser.email + ".");
    // }
  } catch (error) {
    console.log(error);
    //  res.json({ error: error.message });
  }
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
