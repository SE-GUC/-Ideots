const axios = require('axios');
const functions = {
        postApplication: async (app) => {
                const application=await axios.post('http://localhost:3000/api/application',app);
                return application;
        },
        getAllApplication: async () => {
            const application = await axios.get('http://localhost:3000/api/application/');
            return application;
        },
        getApplication: async (id) => {
            const application = await axios.get('http://localhost:3000/api/application/'+id);
            return application;
        },
        updateApplication: async (id,app) => {
            const application = await axios.put('http://localhost:3000/api/application/'+id,app);
            return application;
        },
        deleteApplication: async (id) => {
            const application = await axios.delete('http://localhost:3000/api/application/'+id);
            return application;
        }
}; 
module.exports = functions;
