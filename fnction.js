const axios=require('axios');
const uuid=require('uuid')

const functions ={
    

    getAllReviews:async()=>{
        const reviewList=await axios.get("http://localhost:3000/api/reviews")
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
   
       let res = await axios.post('http://localhost:3000/api/reviews/', params);
       return res
       },

       deleteOnereview : async(id)=>{
        const review =await  axios.delete('http://localhost:3000/api/reviews/'+id)
        return review
     },
     getOneReview : async(id)=>{
        const review =await  axios.get('http://localhost:3000/api/reviews/'+id)
        return review
     },
     

     putOneReview : async(id)=>{
         params = {
            comment:"EDITED cashcash BABY"
         }
      
         let res = await axios.put('http://localhost:3000/api/reviews/'+id, params);
         return res
         },
}
module.exports =functions