/**
 * @jest-environment node
 */

const axios =  require('axios')




const functions = {
    getRequests : async()=>{
        const response =await  axios.get("http://localhost:3000/api/requests/")
        return response
    },
    getRequestById : async(id)=>{
      
        const response =await  axios.get("http://localhost:3000/api/requests/"+id)
        return response
       
     },
     postRequest : async(body)=>{
       
        const response =await  axios.post("http://localhost:3000/api/requests/",body)
        return response
     },
     deleteRequest : async(id)=>{
        const response =await  axios.delete("http://localhost:3000/api/requests/"+id)
        return response
     },
     updateReuest : async(id,body)=>{
        
         const response = await axios.put("http://localhost:3000/api/requests/"+id,body)
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
     }

     
}


module.exports =functions