if(process.env.NODE_ENV === 'production') 
    module.exports = require('./keys_prod')
else 
<<<<<<< HEAD
    module.exports = require('h:/MET/SE/-Ideots-1/config/keys_dev')
=======
    module.exports = require('./keys_dev')
>>>>>>> dev
