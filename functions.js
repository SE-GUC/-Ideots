
const axios=require('axios');




const functions={
    //////////////////////////////////////////////////////
    getadmins: async () => {
        const admins = await axios.get('http://localhost:3000/api/admins')
        return admins
        },

    getadmin:async(id)=>{

        const admin=await axios.get('http://localhost:3000/api/admins/'+id)
        return admin
    } , 
    
    
    postAdmin:async()=>{
    params = {
        name: 'ashry',
        email: 'MaherMohammed45@gmail.com',
        password:'madasasda45',
        phone:'132456'
      }

    let res = await axios.post('http://localhost:3000/api/admins', params);
      return res
    //console.log(res.data);
},

    deleteAdmin:async(id)=>{
        const deletedAdmin=await axios.delete('http://localhost:3000/api/admins/'+id)

        //return deletedAdmin;


    },


    updateAdmin:async(id)=>{

        params = {
            name: 'maher',
            email: 'fahd1@gmail.com',
            password:'madasasda45',
            phone:'132456789'
          }
        const updatedAdmin=await axios.put('http://localhost:3000/api/admins/'+id,params)

        return updatedAdmin;


    }

    



}


    // fetchAdmin:()=>axios.get('http://localhost:3000/api/admins/')
    // .then(res=>res.data)
    // .catch(err=>'error')



module.exports = functions

