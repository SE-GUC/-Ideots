const axios = require('axios');
const functions={
     add : (x,y)=>x+y,

     getAllEventBooking : async()=>{
        const eventBookingList =await  axios.get("http://localhost:3000/api/eventBookings/")
        return eventBookingList
     },

     getOneEventBooking : async(id)=>{
        const eventBooking =await  axios.get("http://localhost:3000/api/eventBookings/"+id)
        return eventBooking
     },

     postOneEventBooking : async()=>{
      params = {
         eventId: "123456789123456789123456" ,
         memberId: "123456789123456789123456",
         registrationPrice: 69696969,
         paymentMethod:"cashcash BABY"
       }
 
     let res = await axios.post('http://localhost:3000/api/eventBookings/', params);
     return res
     },

     putOneEventBooking : async(id)=>{
      params = {
         paymentMethod:"EDITED cashcash BABY"
       }
 
     let res = await axios.put('http://localhost:3000/api/eventBookings/'+id, params);
     return res
     },

     deleteOneEventBooking : async(id)=>{
      const eventBooking =await  axios.delete("http://localhost:3000/api/eventBookings/"+id)
      return eventBooking
     },

     searchTasksByCategory : async(cat)=>{
        const result = await axios.get("http://localhost:3000/api/tasks/search/category="+cat)
        return result
     },

     searchTcasksByYearsOfExp : async(exp)=>{
      const result = await axios.get("http://localhost:3000/api/tasks/search/experience="+exp)
      return result
     },



////////////////////////////////////////////////////////////////////////////////
getAllTask : async()=>{
   const taskList =await  axios.get("http://localhost:3000/api/tasks/")
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

  let res = await axios.post('http://localhost:3000/api/tasks/', params);
  return res
},
////////////////////////////////////////////////////////////////////////////////

   }
   

module.exports=functions;


