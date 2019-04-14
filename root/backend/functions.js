const axios=require('axios');
const uuid=require('uuid')

const functions={
   //--------------------------------------------------------------------(Tasks)--------------------------------------------------------------------------------------------------
     getAllTasks : async()=>{
        const taskList =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/")
        return taskList
     },
//https://lirten-hub-ideots.herokuapp.com
     getOneTask : async(id)=>{
        const task =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/"+id)
        // //console.log('functions get one ',task.data)
        return task
     },

     postOneTask : async(params)=>{
      /*
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
       */
     let res = await axios.post('https://lirten-hub-ideots.herokuapp.com/api/tasks/', params);
     return res
     },

     putOneTask : async(id,params)=>{
      /*
      params = {
        done:true
       }
       */
     let res = await axios.put('https://lirten-hub-ideots.herokuapp.com/api/tasks/'+id, params);
     return res
     },

     deleteOneTask : async(id)=>{
      const task =await  axios.delete("https://lirten-hub-ideots.herokuapp.com/api/tasks/"+id)
      // //console.log("fn delete ",task)
      return task
   },
   
   deleteAllTasks : async() => {
      jest.setTimeout(30000);
      let tasks = await functions.getAllTasks()
      
      let length = tasks.data.data ?tasks.data.data.length:0
      while(length>0)
      {  const lastId = tasks.data.data[tasks.data.data.length-1]["_id"]
         const response = await functions.deleteOneTask(lastId)
         tasks = await functions.getAllTasks()
         length = tasks.data.data ?tasks.data.data.length:0
         //console.log(length)
      }
   return 0
   },
//--------------------------------------------------------------------(Requests)--------------------------------------------------------------------------------------------------
getRequests : async()=>{
   const response =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/requests/")
   return response
},
getRequestById : async(id)=>{
 
   const response =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/requests/"+id)
   return response
  
},
postRequest : async(body)=>{
  
   const response =await  axios.post("https://lirten-hub-ideots.herokuapp.com/api/requests/",body)
   return response
},
deleteRequest : async(id)=>{
   const response =await  axios.delete("https://lirten-hub-ideots.herokuapp.com/api/requests/"+id)
   return response
},
updateReuest : async(id,body)=>{
   
    const response = await axios.put("https://lirten-hub-ideots.herokuapp.com/api/requests/"+id,body)
    return response
},
deleteAll : async() => {
   let requests = await functions.getRequests()

   let length = requests.data.data ?requests.data.data.length:0
   while(length>0)
    { const lastId = requests.data.data[requests.data.data.length-1]["_id"]
     const response = await functions.deleteRequest(lastId)
     requests = await functions.getRequests()
     length = requests.data.data ?requests.data.data.length:0
   }
     return 0
   },
   //--------------------------------------------------------------------(Admin)--------------------------------------------------------------------------------------------------

   getadmins: async () => {
    const admins = await axios.get('https://lirten-hub-ideots.herokuapp.com/api/admins')
    return admins
    },

getadmin:async(id)=>{
    const admin=await axios.get('https://lirten-hub-ideots.herokuapp.com/api/admins/'+id)
    return admin
} , 


postAdmin:async()=>{
params = {
    name: 'ashry',
    email: 'fahd1@gmail.com',
    password:'madasasda45',
    phone:'132456'
  }

let res = await axios.post('https://lirten-hub-ideots.herokuapp.com/api/admins', params);
  return res
},

deleteAdmin:async(id)=>{
    const deletedAdmin=await axios.delete('https://lirten-hub-ideots.herokuapp.com/api/admins/'+id)
    return deletedAdmin;
},


updateAdmin:async(id)=>{
    params = {
        name: 'maher',
        email: 'fahd1@gmail.com',
        password:'madasasda45',
        phone:'132456789'
      }
    const updatedAdmin=await axios.put('https://lirten-hub-ideots.herokuapp.com/api/admins/'+id,params)
    return updatedAdmin;
},
//--------------------------------------------------------------------(Review)--------------------------------------------------------------------------------------

getAllReviews:async()=>{
   const reviewList=await axios.get("https://lirten-hub-ideots.herokuapp.com/api/reviews")
   return reviewList

},

postOneReview : async()=>{
   params = {
       reviewer: "5c956db053b94040f400d70c",
       reviewed: "5c956db053b94040f400d70c",
       rate: 3,
       comment:"dfs",
       reviewType:1
       
    }

  let res = await axios.post('https://lirten-hub-ideots.herokuapp.com/api/reviews/', params);
  console.log(res)
  return res
  },

  deleteOnereview : async(id)=>{
   const review =await  axios.delete('https://lirten-hub-ideots.herokuapp.com/api/reviews/'+id)
   return review
},
getOneReview : async(id)=>{
   const review =await  axios.get('https://lirten-hub-ideots.herokuapp.com/api/reviews/'+id)
   return review
},


putOneReview : async(id)=>{
    params = {
       comment:"EDITED cashcash BABY"
    }
 
    let res = await axios.put('https://lirten-hub-ideots.herokuapp.com/api/reviews/'+id, params);
    return res
    },

    //--------------------------------------------------------------------(EventRequest)--------------------------------------------------------------------------------------



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
//--------------------------------------------------------------------(Events)--------------------------------------------------------------------------------------

getAllEvents : async() =>{
   allEvents = await axios.get('https://lirten-hub-ideots.herokuapp.com/api/events/') 
   return allEvents 
} , 
getAnEventByID : async(id) => {
   theEvent = await axios.get(`https://lirten-hub-ideots.herokuapp.com/api/events/`+id  ) 
   return theEvent
} , 
getAnEventUsingLocation :async (city ,area ,Street ) => { 
   theEvent = await axios.get(`https://lirten-hub-ideots.herokuapp.com/api/events/search/${city}/${area}/${Street}`)
   return theEvent 
} , 
getAnEventByType : async (type)=>{
   theEvent = await axios.get(`https://lirten-hub-ideots.herokuapp.com/api/events/search/${type}`)
   return theEvent 
},
getRecommendedEvents: async(id)=>{
   theEvent = await axios.get(`https://lirten-hub-ideots.herokuapp.com/api/events/recommended/${id}"`)
   return theEvent ;
},
postNewEvent:async(params)=>{
   const newEvent = await axios.post('https://lirten-hub-ideots.herokuapp.com/api/events',params) 
   return newEvent ; 
},
updatingAnEvent:async(id,params)=>{
   const theEvent = await axios.put(`https://lirten-hub-ideots.herokuapp.com/api/events/${id}`,params) 
   return theEvent ; 
} , 
deleteAnEvent :async (id ) =>{
   const deletedEvent = await axios.delete(`https://lirten-hub-ideots.herokuapp.com/api/events/${id}`)
   return deletedEvent ; 
},
//--------------------------------------------------------------------(users)--------------------------------------------------------------------------------------
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
        //  //console.log(userId)
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
        //console.log(userId)
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
     const events = await axios.get('https://lirten-hub-ideots.herokuapp.com/api/events/search/'+city+'/'+Street+'/'+Area+'')
     return events
   },
   //--------------------------------------------------------------------(EventBooking)--------------------------------------------------------------------------------------
   
   getAllEventBooking : async()=>{
      const eventBookingList =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/eventBookings/")
      return eventBookingList
   },

   getOneEventBooking : async(id)=>{
      const eventBooking =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/eventBookings/"+id)
      return eventBooking
   },

   postOneEventBooking : async()=>{
    params = {
       eventId: "123456789123456789123456" ,
       memberId: "123456789123456789123456",
       registrationPrice: 69696969,
       paymentMethod:"cashcash BABY"
     }

   let res = await axios.post('https://lirten-hub-ideots.herokuapp.com/api/eventBookings/', params);
   return res
   },

   putOneEventBooking : async(id)=>{
    params = {
       paymentMethod:"EDITED cashcash BABY"
     }

   let res = await axios.put('https://lirten-hub-ideots.herokuapp.com/api/eventBookings/'+id, params);
   return res
   },

   deleteOneEventBooking : async(id)=>{
    const eventBooking =await  axios.delete("https://lirten-hub-ideots.herokuapp.com/api/eventBookings/"+id)
    return eventBooking
   },

   searchTasksByCategory : async(cat)=>{
      const result = await axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/search/category="+cat)
      return result
   },

   searchTcasksByYearsOfExp : async(exp)=>{
    const result = await axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/search/experience="+exp)
    return result
   },



   
postSpecificTask : async()=>{
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
   //--------------------------------------------------------------------(Notifications)--------------------------------------------------------------------------------------
   getAllNotifications : async() => {
      const notifications = await axios.get("https://lirten-hub-ideots.herokuapp.com/api/notifications")
      return notifications
  },
  
  getSpecificNotification : async() => {
      const id =await  functions.getAllNotifications()
      const notification = await axios.get("https://lirten-hub-ideots.herokuapp.com/api/notifications/"+id.data.data[0]._id)
      return notification

  },
  
  postOneNotification : async () => {
       body = {
          content: "leeh",
          recieverId: "54759eb3c090d83494e2d804",
          notifierId: "54759eb3c090d83494e2d803"
      }

      let postRes = await axios.post("https://lirten-hub-ideots.herokuapp.com/api/notifications",body);
      return postRes
  },

  

 

  updatingAnotification : async() => {
      params = {
          isRead: true
      }
      const id =await  functions.getAllNotifications()
      let update = await axios.put("https://lirten-hub-ideots.herokuapp.com/api/notifications/"+id.data.data[0]._id,params)
      return update
  },

  deleteNotification : async() => {
      const id =await  functions.getAllNotifications()
      const deleteReq = await axios.delete("https://lirten-hub-ideots.herokuapp.com/api/notifications/"+id.data.data[0]._id)
      return deleteReq 
  },


// --------------------------------------------------------------------(Application)--------------------------------------------------------------------------------------
postApplication: async () => {
   const config = {
           applicantId: "5c9fe28433caec2078bfa349",
           taskId:"5c9556fc528e180fd91a0b1b"
   }
   const app=await axios.post('https://lirten-hub-ideots.herokuapp.com/api/application',config);
   return app;
},
getAllApplication: async () => {
const application = await axios.get('https://lirten-hub-ideots.herokuapp.com/api/application/');
return application;
},
getApplication: async (id) => {
const application = await axios.get('https://lirten-hub-ideots.herokuapp.com/api/application/'+id);
return application;
},
updateApplication: async (id) => {
const config = {
       date:"2017-04-30T23:34:28.802Z",
       acceptance:1
}
const application = await axios.put('https://lirten-hub-ideots.herokuapp.com/api/application/'+id,config);
return application;
},
deleteApplication: async (id) => {
const application = await axios.delete('https://lirten-hub-ideots.herokuapp.com/api/application/'+id);
return application;
}
// --------------------------------------------------------------------()--------------------------------------------------------------------------------------


}
module.exports=functions;

   
