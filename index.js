const express = require('express')

const mongoose = require('mongoose');

const config =require('./config/keys.js')


const admins = require('./routes/api/admins')
const consaltancyAgencies = require('./routes/api/consaltancyAgencies')
const application = require('./routes/api/application')
const notification = require('./routes/api/notification')
const partner = require('./routes/api/partner')
const requests = require('./routes/api/requests')
const tasks = require('./routes/api/tasks')
const event = require('./routes/api/event')
const eventRequest = require('./routes/api/eventRequest')
const eventBooking = require('./routes/api/eventBooking')
const members = require('./routes/api/members')
const reviews = require('./routes/api/reviews')
const mongoose =require('mongoose')

const app = express()
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))



mongoose.connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('We are connected to MongoDB'))
    .catch(err => console.log(err))


app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h2>Welcome to LirtenHub</h2> `);
})

// Direct routes to appropriate files 
app.use('/api/admins',admins)
app.use('/api/consaltancyAgencies',consaltancyAgencies)

app.use('/api/notifications', notification)
app.use('/api/partners', partner)
app.use('/api/applications', application)
app.use('/api/requests', requests)
app.use('/api/tasks',tasks)
app.use('/api/events', event)
app.use('/api/eventRequests', eventRequest)
app.use('/api/eventBookings', eventBooking)
app.use('/api/members', members)
app.use('/api/reviews', reviews)

//config db
const db = require('./config/keys_dev').mongoURI


//connecting to database
mongoose
    .connect(db, { useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

    
//to be integrated----------------

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))