const axios = require('axios');
const functions = {
        postApplication: async (app) => {
                const application=await axios.post('https://lirten-hub-ideots.herokuapp.com/api/application',app);
                return application;
        },
        getAllApplication: async () => {
            const application = await axios.get('https://lirten-hub-ideots.herokuapp.com/api/application/');
            return application;
        },
        getApplication: async (id) => {
            const application = await axios.get('https://lirten-hub-ideots.herokuapp.com/api/application/'+id);
            return application;
        },
        updateApplication: async (id,app) => {
            const application = await axios.put('https://lirten-hub-ideots.herokuapp.com/api/application/'+id,app);
            return application;
        },
        deleteApplication: async (id) => {
            const application = await axios.delete('https://lirten-hub-ideots.herokuapp.com/api/application/'+id);
            return application;
        }
}; 
module.exports = functions;
