const axios=require('axios');

const functions={
    
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
}

module.exports = functions

