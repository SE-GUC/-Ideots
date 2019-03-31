const axios = require('axios');
const functions = {
        postApplication: async () => {
                const config = {
                        applicantId: "5c9fe28433caec2078bfa349",
                        taskId:"5c9556fc528e180fd91a0b1b"
                }
                const app=await axios.post('http://localhost:3000/api/application',config);
                return app;
        },
        getAllApplication: async () => {
            const application = await axios.get('http://localhost:3000/api/application/');
            return application;
        },
        getApplication: async (id) => {
            const application = await axios.get('http://localhost:3000/api/application/'+id);
            return application;
        },
        updateApplication: async (id) => {
            const config = {
                    date:"2017-04-30T23:34:28.802Z",
                    acceptance:1
            }
            const application = await axios.put('http://localhost:3000/api/application/'+id,config);
            return application;
        },
        deleteApplication: async (id) => {
            const application = await axios.delete('http://localhost:3000/api/application/'+id);
            return application;
        }
}; 
module.exports = functions;