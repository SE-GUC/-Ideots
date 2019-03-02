const express = require('express')

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

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h2>Welcome</h2> `);
})

// Direct routes to appropriate files 
app.use('/api/admins',admins)
app.use('/api/consaltancyAgencies',consaltancyAgencies)
app.use('/api/Notification', notification)
app.use('/api/Partner', partner)
app.use('/api/Application', application)
app.use('/api/requests', requests)
app.use('/api/tasks',tasks)``
app.use('/api/event', event)
app.use('/api/eventRequest', eventRequest)
app.use('/api/eventBooking', eventBooking)
app.use('/api/members', members)
app.use('/api/reviews', reviews)


//to be integrated----------------

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
