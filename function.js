const axios = require('axios');
const functions = {
   
    //////////TESTING CRUDS FOR USERS\\\\\\\\\\\\

    //Get all users
    getAllUsers : async ()=> {
      //  axios.defaults.adapter = require('axios/lib/adapters/http')
        const users = await axios.get ('https://lirten-hub-ideots.herokuapp.com/api/users/')
        return users
    },

    //Create a new member user 
    createMemberUser : async (body)=>{
      //axios.defaults.adapter = require('axios/lib/adapters/http')
      const response=  await axios.post ('https://lirten-hub-ideots.herokuapp.com/api/users/',body)
      return response
     },

    //Create a new partner user 
    createPartnerUser : async (body)=>{
        //axios.defaults.adapter = require('axios/lib/adapters/http')
        const response=  await axios.post ('https://lirten-hub-ideots.herokuapp.com/api/users/',body)
        return response
    },
    
    //Create a new agency user 
    createAgencyUser : async (body)=>{
        //axios.defaults.adapter = require('axios/lib/adapters/http')
        const response=  await axios.post ('https://lirten-hub-ideots.herokuapp.com/api/users/',body)
        return response
    },

    //Get a specified user by ID
    getSpecifiedUser : async ()=> {
        //  axios.defaults.adapter = require('axios/lib/adapters/http')
          const users = await axios.get ('https://lirten-hub-ideots.herokuapp.com/api/users/')
          const userId=users.data.data[users.data.data.length-1]._id
        //  console.log(userId)
          const specifiedUser = await axios.get ('https://lirten-hub-ideots.herokuapp.com/api/users/'+userId)
          return specifiedUser
      },

    //Get all members
    getAllMembers : async ()=> {
        //  axios.defaults.adapter = require('axios/lib/adapters/http')
          const members = await axios.get ('https://lirten-hub-ideots.herokuapp.com/api/users/members')
          return members
      },

    //Update a user      (Not tested yet)
    updateSpecificUser : async (body)=> {
      //  axios.defaults.adapter = require('axios/lib/adapters/http')
        const users = await axios.get ('https://lirten-hub-ideots.herokuapp.com/api/users/')
        const userId=users.data.data[users.data.data.length-1]._id
        console.log(userId)
        const specifiedUser = await axios.put ('https://lirten-hub-ideots.herokuapp.com/api/users/'+userId,body)
        return specifiedUser
      },
    
    //Delete a user
    deleteSpecificUser :async()=>{
    
      const users = await axios.get ('https://lirten-hub-ideots.herokuapp.com/api/users/')
  
    const userId=users.data.data[users.data.data.length-1]._id //get the id of the last user
    
    const deleted =await axios.delete ('https://lirten-hub-ideots.herokuapp.com/api/users/'+userId)  //then delete it 
      return deleted
  
   },
   
   searchEventByLocation : async (city,Street,Area)=>{
     const events = await axios.get('http://localhost:3000/api/events/search/'+city+'/'+Street+'/'+Area+'')
     return events
   }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   //el mashakel
   //update all cases?? 
   
   
};
module.exports = functions;