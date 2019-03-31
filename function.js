const axios = require('axios');
const functions={
     add : (x,y)=>x+y,

     getAllTask : async()=>{
        const taskList =await  axios.get("http://localhost:3000/api/tasks/")
        return taskList
     },

     getOneTask : async(id)=>{
        const task =await  axios.get("http://localhost:3000/api/tasks/"+id)
        // console.log('functions get one ',task.data)
        return task
     },

     postOneTask : async()=>{
      params = {
                partnerID :"123456789123456789123456" ,
                requiredSkills :["Self learning" , "self motivated"],
                consultancyID :"123456789123456789123456" ,
                description :"test the cruds",
                payment :13245            
                ,finalProduct: "https://drive.google.com/drive/folders/0BzEl8pp_zP5efnlONkxEb1NIM25zZ0lsa0NKdTgwWEk2LW40MkpHNnBhaXJsTFJrem9GZ2c?dti=395296137294031&fref=gc"
                ,timeLine : "2019-05-05"     //??????????????????????
                ,state :"pending" 
                ,category :"MET" 
                ,yearsOfExperience : 12
                ,done : "false"
                ,ratePartnerDoer :3
                ,ratePartnerConsultancy :2
                ,assignedPerson :"123456789123456789123456"              

                // ,applicants :["123456789123456789123456","123456789123456789123456","123456789123456789123456"]    

         /*
        timeline:
        { type: Date,               ?????????????????????????????????
        }
        },      //-1 rejected , 0 pending , 1 accepted      ??????????????????????????
         */

       }
 
     let res = await axios.post('http://localhost:3000/api/tasks/', params);
     return res
     },

     putOneTask : async(id)=>{
      params = {
        done:true
       }
     let res = await axios.put('http://localhost:3000/api/tasks/'+id, params);
     return res
     },

     deleteOneTask : async(id)=>{
      const task =await  axios.delete("http://localhost:3000/api/tasks/"+id)
      // console.log("fn delete ",task)
      return task
   },

}
module.exports=functions;

