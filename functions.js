const axios=require('axios');
const uuid=require('uuid')

const functions={
   //--------------------------------------------------------------------(Tasks)--------------------------------------------------------------------------------------------------
     getAllTasks : async()=>{
        const taskList =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/")
        return taskList
     },

     getOneTask : async(id)=>{
        const task =await  axios.get("https://lirten-hub-ideots.herokuapp.com/api/tasks/"+id)
        // console.log('functions get one ',task.data)
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
      // console.log("fn delete ",task)
      return task
   },
   
   deleteAllTasks : async() => {
      let tasks = await functions.getAllTasks()
      
      let length = tasks.data.data ?tasks.data.data.length:0
      while(length>0)
      {  const lastId = tasks.data.data[tasks.data.data.length-1]["_id"]
         const response = await functions.deleteOneTask(lastId)
         tasks = await functions.getAllTasks()
         length = tasks.data.data ?tasks.data.data.length:0
         console.log(length)
      }
   return 0
   },
//--------------------------------------------------------------------(Requests)--------------------------------------------------------------------------------------------------
getRequests : async()=>{
   const response =await  axios.get("https://lirten-hub-ideots.herokuapp.com/")
   return response
},
getRequestById : async(id)=>{
 
   const response =await  axios.get("https://lirten-hub-ideots.herokuapp.com/"+id)
   return response
  
},
postRequest : async(body)=>{
  
   const response =await  axios.post("https://lirten-hub-ideots.herokuapp.com/",body)
   return response
},
deleteRequest : async(id)=>{
   const response =await  axios.delete("https://lirten-hub-ideots.herokuapp.com/"+id)
   return response
},
updateReuest : async(id,body)=>{
   
    const response = await axios.put("https://lirten-hub-ideots.herokuapp.com/"+id,body)
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


}
module.exports=functions;

   

