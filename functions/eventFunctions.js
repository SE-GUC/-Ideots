
const axios = require('axios') ; 


const functions = {


    getAllEvents : async() =>{
        allEvents = await axios.get('http://localhost:3000/api/events/') 
        return allEvents 
    } , 
    getAnEventByID : async(id) => {
        theEvent = await axios.get(`http://localhost:3000/api/events/`+id  ) 
        return theEvent
    } , 
    getAnEventUsingLocation :async (city ,area ,Street ) => { 
        theEvent = await axios.get(`http://localhost:3000/api/events/search/${city}/${area}/${Street}`)
        return theEvent 
    } , 
    getAnEventByType : async (type)=>{
        theEvent = await axios.get(`http://localhost:3000/api/events/search/${type}`)
        return theEvent 
    },
    getRecommendedEvents: async(id)=>{
        theEvent = await axios.get(`http://localhost:3000/api/events/recommended/${id}"`)
    }


} ; 


module.exports = functions ; 