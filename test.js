const funcs = require('./functions');


//test creating a member                                                                //////////////THIS IS WORKING
test('creates a member user', async()=> {
   expect.assertions(1);
  let body={
        "email":"takeCareAgain55555@gmail.com",
        "password":"Abc1234567",
        "type":"member",
        "name":{"first name":"first user"},
        "phoneNumber":["010065248971"],
        "birthDate":"1998-03-15",
        "location":{
            "city":"cairo",
            "Area":"rehab",
            "street":"el salam"
        },
        "otherContacts":["010025436","asdfaadf@gmail.com"],
        "field":["java"],
        "skills":["java","swing"],
        "interests":["coding"],
        "experience":["experience in games"]
    }
    const response= await funcs.createMemberUser(body)
   // console.log(response)
    expect(response.data.data.email).toBe("takeCareAgain55555@gmail.com");
})

//test creating a partner                                                           //////////////THIS IS WORKING
test('creates a partner user', async()=> {
    expect.assertions(1);
   let body={
        "type": "partner",
        "name": "partner 1",
        "email":"yalabinaaaaa@yahoo.com",
        "password": "Abc1234567",
        "basicBussinesInformation":{"info":"wallahy yabni ma3raf"},
        "fieldOfWork":["coding","other shit"],
        "contactInfo":{
                "phone Number":"01000256879",
                "email":"yalabina@yahoo.com"
        }
     }
     await funcs.createPartnerUser(body)
     const response= await funcs.getSpecifiedUser()
     console.log(response)
     expect(response.data.email).toBe("yalabinaaaaa@yahoo.com");
 })


//test creating a Agency      
test('creates a agency user', async()=> {
        expect.assertions(1);
   let body=  { "type":'consultancy_agency',
               "name":"agency name",
               "email":"agencyemail66@gmail.com",
               "password":"tesTing12345678",
               "description":"agency for kaza",
               "specialization":["bla bla bla","bla"],
               "website":"www.welcom.com",
               "fax":"223365",
               "address":{"city":"cairo","Area":"down town"}
            }
        await funcs.createAgencyUser(body)
     const response= await funcs.getSpecifiedUser()
     //console.log(response)
     expect(response.data.email).toBe("agencyemail66@gmail.com");
 })

//test getting a specified user                                                       //////////////THIS IS WORKING
test ('gets the last user by id',async ()=> {
    expect.assertions(1);
    const response =await funcs.getSpecifiedUser();
   // console.log(response)
    expect(response.data.email).toBe("agencyemail66@gmail.com");
});

// //test getting all members                                                              //////////////THIS IS WORKING
test ('gets all members',async ()=> {
    expect.assertions(1);
    const response =await funcs.getAllMembers();
  //  console.log(response)
    expect(response.data.data[response.data.data.length-1].email).toBe("takeCareAgain55555@gmail.com");
});

// //test getting all users                                                              //////////////THIS IS WORKING
test ('gets all users',async ()=> {
    expect.assertions(1);
    const response =await funcs.getAllUsers();
    //console.log(response)
    expect(response.data.data[response.data.data.length-1].email).toBe("agencyemail66@gmail.com");
});


// //test deleting a user 
test ('after deleting a user their number should decrease by one',async ()=> {
    expect.assertions(1);
    const response =await funcs.getAllUsers();
    const initialSize = response.data.data.length
    console.log(initialSize)
    const deleted = await funcs.deleteSpecificUser()
    console.log(deleted)
   const res = await funcs.getAllUsers()
   const afterSize = res.data.data.length
    expect(initialSize-afterSize).toBe(1);
});



//test updating a user

test('updating the website of a user',async ()=>{
    expect.assertions(1);
    body={
        "name":"name"
    }
   // const  lastUserEmail =await funcs.getSpecifiedUser().data.email
   // console.log("eamil before update"+lastUserEmail)
    const response=await funcs.updateSpecificUser(body)
   // console.log("eamil after update"+response.data.email)
   console.log(response)
   const res = await funcs.getSpecifiedUser()
    expect(res.data.name).toBe("name");
});












//////////////////////////////////
// {
//     type: Joi.string().required().valid('partner','member','consultancy_agency'),
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).alphanum().required(),
//     description:Joi.string().required(),
//     specialization:Joi.array().items(Joi.string()).required(),
//     website:Joi.string().required(),
//     fax:Joi.strict().required(),
//     address:Joi.object().required(),
//     reports:Joi.array().items(Joi.string()),
//     boardMembers:Joi.array().items(Joi.objectId()),
//     partners:Joi.array().items(Joi.objectId()),
//     events:Joi.array().items(Joi.objectId())
// }