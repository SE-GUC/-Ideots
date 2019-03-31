const axios = require('axios');
const functions={
    

     getAllEventRequest : async()=>{
        const eventRequestList =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/eventRequests")
        return eventRequestList
     },

     getOneEventRequest : async(id)=>{
        const eventRequest =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/eventRequests/"+id)
        return eventRequest
     },

     postEventRequest :async() =>{
      params ={
         location :{city:"cairo",Street:"sd",Area:"sdsf"},
         description:"hahffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffah",
         type:"hals",
         registrationPrice : 100,
         numberOfSpaces:59,
         speakers :["klsdh","khf"],
         topics:["fdkjdf"],
         dateTime:"2018-01-30T23:35:28.802Z",
         organizerId:"5c9548cd483b9623b44f9cd5",
         acceptenceState:0
     }

     
     let res = await axios.post('https://lirten-hub-ideots.herokuapp.com/api/eventRequests', params);
     return res
     },
     
     putOneEventRequest : async(id)=>{
      params = {
         type:"hals"
       }
 
     let res = await axios.put('https://lirten-hub-ideots.herokuapp.com/api/eventRequests/'+id, params);
     return res
     },

     deleteOneEventRequest : async(id)=>{
      const eventRequest =await  axios.delete("https://lirten-hub-ideots.herokuapp.com/api/eventRequests/"+id)
      return eventRequest
   },

   searchTcasksByPayment : async(money)=>{
      const result = await axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/search/payment="+money)
      return result
     },


   getAllTask : async()=>{
      const taskList =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/")
      return taskList
   },
   postOneTask : async()=>{
      params = {
                partnerID :"123456789123456789123456" ,
                requiredSkills :["Self learning" , "self motivated"],
                consultancyID :"123456789123456789123456" ,
                description :"test the cruds",
                payment :13245            
                ,finalProduct: "https://drive.google.com/drive/folders/0BzEl8pp_zP5efnlONkxEb1NIM25zZ0lsa0NKdTgwWEk2LW40MkpHNnBhaXJsTFJrem9GZ2c?dti=395296137294031&fref=gc"
                ,timeLine : "2019-05-05"    
                ,state :"pending" 
                ,category :"MET" 
                ,yearsOfExperience : 12
                ,done : "false"
                ,ratePartnerDoer :3
                ,ratePartnerConsultancy :2
                ,assignedPerson :"123456789123456789123456"              
       }
   
     let res = await axios.post('https://lirten-hub-ideots.herokuapp.com/api/tasks/', params);
     return res
   },
}
module.exports=functions;


