const express = require("express");
const mongoose = require("mongoose");

const passport = require("passport");

const config = require("./config/keys.js");

const admins = require("./routes/api/admins");
const application = require("./routes/api/application");
const notification = require("./routes/api/notification");
const requests = require("./routes/api/requests");
const tasks = require("./routes/api/tasks");
const event = require("./routes/api/event");
const eventRequest = require("./routes/api/eventRequest");
const eventBooking = require("./routes/api/eventBooking");
const users = require("./routes/api/users.js");
const reviews = require("./routes/api/reviews");
const login = require("./routes/api/login");
const auth = require("./routes/api/auth");
const app = express();
const cors = require("cors");
const adminRequests = require("./routes/api/adminRequests");
app.use(cors());

app.use(express.json());

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("We are connected to MongoDB"))
  .catch(err => console.log(err));

//entry point

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(`<h2>Welcome to LirtenHub</h2> `);
});

/*app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
})*/

//passport configuration
require("./config/passport");

// Direct routes to appropriate files
app.use("/api/admins", admins);
app.use(
  "/api/notifications",
  passport.authenticate("jwt", { session: false }),
  notification
);
app.use("/api/adminRequests", adminRequests);
app.use("/api/applications", application);
app.use(
  "/api/requests",
  passport.authenticate("jwt", { session: false }),
  requests
);
app.use("/api/tasks", passport.authenticate("jwt", { session: false }), tasks);
app.use("/api/events", passport.authenticate("jwt", { session: false }), event);
app.use("/api/eventRequests", eventRequest);
app.use("/api/eventBookings",  passport.authenticate("jwt", { session: false }),eventBooking);
app.use("/api/users", passport.authenticate("jwt", { session: false }),users);

app.use("/api/reviews", reviews);
app.use("/api/login", login);
app.use("/api/auth", auth);

//to be integrated----------------

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
