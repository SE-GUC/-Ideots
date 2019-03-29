const funcs = require('./functions');


//test creating a member                                                                //////////////THIS IS WORKING
// test('creates a member user', async()=> {
//    expect.assertions(1);
//   let body={
//         "email":"takeCareAgain3@gmail.com",
//         "password":"Abc1234567",
//         "type":"member",
//         "name":{"first name":"first user"},
//         "phoneNumber":["010065248971"],
//         "birthDate":"1998-03-15",
//         "location":{
//             "city":"cairo",
//             "Area":"rehab",
//             "street":"el salam"
//         },
//         "otherContacts":["010025436","asdfaadf@gmail.com"],
//         "field":["java"],
//         "skills":["java","swing"],
//         "interests":["coding"],
//         "experience":["experience in games"]
//     }
//     const response= await funcs.createMemberUser(body)
//     console.log(response)
//     expect(response.data.data.email).toBe("takeCareAgain3@gmail.com");
// })

//test creating a partner   /////////////////////////////////////////MESH HA3RAF A TEST 3SHAN FI ID REQUIRED
// test('creates a partner user', async()=> {
//     expect.assertions(1);
//    let body={
//         "type": "partner",
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//                 "password": "Abc1234567",
//                 "basicBussinesInformation":{"info":"wallahy yabni ma3raf"},
//                 "boardMembers":[{"chief":"ana tab3an"},{"worker":"hossam"}],
//                 "fieldOfWork":["coding","other shit"],
//               //  "partners":Joi.array().items(Joi.objectId()).required(),
//      }
//      const response= await funcs.createMemberUser(body)
//      console.log(response)
//      expect(response.data.data.email).toBe("takeCareAgain3@gmail.com");
//  })


//test creating a Agency      /////////////////////////////////////////MESH HA3RAF A TEST 3SHAN FI ID REQUIRED
// test('creates a agency user', async()=> {
    //     expect.assertions(1);
//    let body={
    //                " type": "consultancy_agency",
//                " name": "agnecy kbira w 5las",
//                " email": "lalaland@hotmail.com",
//                " password": "0100Abc555555",
//                " basicBussinesInformation":{"info":"wallahy yabni ma3raf"},
//              //  " boardMembers":Joi.array().items(Joi.objectId()).required(),
//                " fieldOfWork":Joi.array().items(Joi.string()).required(),
//                " partners":Joi.array().items(Joi.objectId()).required(),
//                " contactInfo":Joi.object().required())
//      }
//      const response= await funcs.createMemberUser(body)
//      console.log(response)
//      expect(response.data.data.email).toBe("takeCareAgain3@gmail.com");
//  })

//test getting a specified user                                                       //////////////THIS IS WORKING
test ('gets the last user by id',async ()=> {
    expect.assertions(1);
    const response =await funcs.getSpecifiedUser();
   // console.log(response)
    expect(response.data.email).toBe("takeCareAgain3@gmail.com");
});

//test getting all members                                                              //////////////THIS IS WORKING
test ('gets all members',async ()=> {
    expect.assertions(1);
    const response =await funcs.getAllMembers();
  //  console.log(response)
    expect(response.data.Members[response.data.Members.length-1].email).toBe("takeCareAgain3@gmail.com");
});

//test getting all users                                                              //////////////THIS IS WORKING
test ('gets all users',async ()=> {
    expect.assertions(1);
    const response =await funcs.getAllUsers();
    //console.log(response)
    expect(response.data.Users[response.data.Users.length-1].email).toBe("takeCareAgain3@gmail.com");
});


















//////////////////////////////////
// {
//             type: Joi.string().required().valid('partner','member','consultancy_agency'),
//             name: Joi.string().required(),
//             email: Joi.string().email().required(),
//             password: Joi.string().min(8).alphanum().required(),
//             basicBussinesInformation:Joi.object().required(),
//             boardMembers:Joi.array().items(Joi.objectId()).required(),
//             fieldOfWork:Joi.array().items(Joi.string()).required(),
//             partners:Joi.array().items(Joi.objectId()).required(),                         /////ezay objectID required
//             eventOrganized:Joi.array().items(Joi.objectId()),
//             formFeedBack:Joi.object(),
//             pastProjects:Joi.array().items(Joi.objectId()),
//             contactInfo:Joi.object().required()
//         }


//             type: Joi.string().required().valid('partner','member','consultancy_agency'),
//             name: Joi.string().required(),
//             email: Joi.string().email().required(),
//             password: Joi.string().min(8).alphanum().required(),
//             basicBussinesInformation:Joi.object().required(),
//             boardMembers:Joi.array().items(Joi.objectId()).required(),
//             fieldOfWork:Joi.array().items(Joi.string()).required(),
//             partners:Joi.array().items(Joi.objectId()).required(),            /////ezay objectID required
//             eventOrganized:Joi.array().items(Joi.objectId()),
//             formFeedBack:Joi.object(),
//             pastProjects:Joi.array().items(Joi.objectId()),
//             contactInfo:Joi.object().required()