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

}
module.exports=functions;


