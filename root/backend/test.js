
const notifications_test = require('./routes/api/notification');

const axios =  require('axios')
const functions = require('./functions')

 //-----------------------------------------------------------------((Task))---------------------------------------------


test("Delete all records",async()=>{
    const delteAll=await functions.deleteAllTasks();
    const getAll = await functions.getAllTasks();
    expect(getAll.data.data.length).toBe(0)

})

test("posting one task",async()=>{
    const getBeforePost = await functions.getAllTasks();
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
    const post = await functions.postOneTask(params);
    const getAfterPost = await functions.getAllTasks();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});

test("getting all items in Task",async()=>{
    expect.assertions(1)
    const response = await functions.getAllTasks();
    expect(response.data.data.length).toBeGreaterThanOrEqual(0);
});
test("getting one Task by ID",async()=>{
    expect.assertions(1);
    const getAll = await functions.getAllTasks();
    const TaskID = getAll.data.data[getAll.data.data.length-1]["_id"];
    const getOne = await functions.getOneTask(TaskID);
    // expect(getOne.data.data["_id"]).toBe(TaskID)
    expect(getOne.data.task["_id"]).toBe(TaskID)
});

test("putting one Task",async()=>{
    expect.assertions(1);
    const get = await functions.getAllTasks();
    // //console.log(get.data.data)
    const id = get.data.data.length-1
    // //console.log(id)
    params = {
        done:true
    }
    const put = await functions.putOneTask(get.data.data[id]["_id"],params);
    const getOne = await functions.getOneTask(get.data.data[id]["_id"]);
    // expect(getOne.data.data["done"]).toBe(true)
    expect(getOne.data.task["done"]).toBe(true)
});


test("deleting one Task",async()=>{
    expect.assertions(1)
    const getBefore = await functions.getAllTasks();
    const id = getBefore.data.data[getBefore.data.data.length-1]["_id"]
    const deleted = await functions.deleteOneTask(id);
    const getAfter = await functions.getAllTasks();
    // expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});


 //-----------------------------------------------------------------((Request))---------------------------------------------
 test('postRequest',async()=>{
    expect.assertions(1)
    const then = await functions.getRequests();
    const response = await functions.postRequest({"partnerID":"123456789123456789123456",
    "description":"new3",
    "consult":true
    });
    const now = await functions.getRequests();
    let length = then.data.data ?then.data.data.length:0
    expect(now.data.data.length).toBeGreaterThan(length)
})

test("no request with that id",async()=>{
    expect.assertions(1)
    const request = await functions.deleteAll()

    const response = await functions.getRequestById("5ca0ca9e3f3a5a302c6bd9b9")
    expect(response.data.msg).toBe("Request does not exist")

})


test('postRequest violationg the validation',async()=>{
    expect.assertions(1)
    const response = await functions.postRequest({"partnerID":"123456789123456789123456",
    "description":3,
    "consult":true
    });
    expect(response.data.msg).toBe( "\"description\" must be a string")
})

test("getting requests when there is no" , async()=>{

    expect.assertions(1)
    const response22 = await functions.deleteAll();
    const response = await functions.getRequests();

    expect(response.data.msg).toBe("empty")
})


test('getRequest', async () => {
    expect.assertions(2)
    const post = await functions.postRequest({"partnerID":"123456789123456789123456",
    "description":"new4",
    "consult":true
    });
    const response = await functions.getRequests();
    expect(response.data.data.length).toBeGreaterThanOrEqual(1);
    expect(response.data.data[response.data.data.length-1].description).toBe("new4");
});

test('getRequestById', async () =>{
    expect.assertions(2)
    const post = await functions.postRequest(
        {"partnerID":"123456789123456789123456",
    "description":"new5",
    "consult":true
    }
    )
    const response = await functions.getRequests();
    const lastId = response.data.data[response.data.data.length-1]["_id"]
    const getById = await functions.getRequestById(lastId)
  
    expect(getById.data.request["description"]).toEqual("new5")
    expect(getById.data.request["_id"]).toEqual(lastId)
  })


  test('updaterequest',async()=>{
    
    expect.assertions(6)
    const post = await functions.postRequest(   
    {"partnerID":"123456789123456789123456",
    "description":"new5",
    "consult":true
    })
    let getRequests = await functions.getRequests()
    const lastId =  getRequests.data.data[getRequests.data.data.length-1]["_id"]
    
    const response = await functions.updateReuest(lastId, 
    {"description":"new",
    "accepted":1,
    "consultancyID":"123456789123456789123456",
    "feedback":"dsv"})
    getRequests = await functions.getRequests()
    const lastReq = getRequests.data.data[getRequests.data.data.length-1]
 
    expect(lastReq.description).toEqual("new"),
    expect(lastReq.consult).toEqual( true),
    expect(lastReq.accepted).toEqual(1),
    expect(lastReq.consultancyID).toEqual("123456789123456789123456")
    expect(lastReq.feedback).toEqual("dsv")
    expect(response.data.msg).toEqual("Request updated successfully")
})

test('violating validations when updaterequest ',async()=>{
    
    expect.assertions(1)
    const post = await functions.postRequest(   
    {"partnerID":"123456789123456789123456",
    "description":"new5",
    "consult":true
    })
    let getRequests = await functions.getRequests()
    const lastId =  getRequests.data.data[getRequests.data.data.length-1]["_id"]
    
    const response = await functions.updateReuest(lastId, 
    {"description":3,
    "accepted":1,
    "consultancyID":"123456789123456789123456",
    "feedback":"dsv"})
   
    expect(response.data.msg).toEqual( "\"description\" must be a string")
})

test('updaterequest with an id not found ',async()=>{
    
    expect.assertions(1)
    const response22 = await functions.deleteAll();
    const response = await functions.updateReuest("5ca0ca9e3f3a5a302c6bd9b9", 
    {"description":3,
    "accepted":1,
    "consultancyID":"123456789123456789123456",
    "feedback":"dsv"})
   
    expect(response.data.msg).toEqual( "Request does not exist")
})

test('deleterequest',async()=>{
    expect.assertions(1)
    const postReq = await functions.postRequest({"partnerID":"123456789123456789123456",
    "description":"new6",
    "consult":true
    })

    let requests = await functions.getRequests()
  
    const lengthThen = requests.data.data.length
  
    const lastId = requests.data.data[requests.data.data.length-1]["_id"]
  
    const response = await functions.deleteRequest(lastId)
  
    requests = await functions.getRequests()
  
    
    let now = requests.data.data ?requests.data.data.length:0
    expect(now).toEqual(lengthThen-1)
})

test('delete DataBase',async ()=>{
   expect.assertions(1)
   const request = await functions.deleteAll()
   const response = await functions.getRequests();

    expect(response.data.msg).toBe("empty")

})
             //-----------------------------------------------------------------((Admin))---------------------------------------------

test('posting an admin',async () => {
    expect.assertions(2)
    const getBefore=await functions.getadmins();
    const postAdmin=await functions.postAdmin();
    expect(Object.keys(postAdmin)).not.toEqual(['error']);
    const getAfter=await functions.getadmins();
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length+1)
    });
    
    test("getting all admins ",async()=>{
      expect.assertions(2)
      const response = await functions.getadmins();
      expect(Object.keys(response)).not.toEqual(['error']);
      expect(response.data.data.length).toBeGreaterThanOrEqual(1);
    });
    
    test("getting one admin by ID",async()=>{
      expect.assertions(2);
      const getAll = await functions.getadmins();
      const adminID = getAll.data.data[getAll.data.data.length-1]["_id"];
      const getOne = await functions.getadmin(adminID);
      expect(Object.keys(getOne)).not.toEqual(['error']);
      expect(getOne.data["_id"]).toBe(adminID)
    });
    
    test("putting one admin",async()=>{
      expect.assertions(2);
      const get = await functions.getadmins();
      const id = get.data.data.length-1
      const put = await functions.updateAdmin(get.data.data[id]["_id"]);
      expect(Object.keys(put)).not.toEqual(['error']);
      const getOne = await functions.getadmin(get.data.data[id]["_id"]);
      //console.log(getOne.data)
      expect(getOne.data["email"]).toBe("fahd1@gmail.com")
    });
    
    test("deleting one admin",async()=>{
      expect.assertions(2)
      const getBefore = await functions.getadmins();
      const id = getBefore.data.data.length-1
      const deleted = await functions.deleteAdmin(getBefore.data.data[id]["_id"]);
      expect(Object.keys(deleted)).not.toEqual(['error']);
      const getAfter = await functions.getadmins();
      expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
    });
    

    //-----------------------------------------------------------------((Review))---------------------------------------------

test("posting one Review",async()=>{
    expect.assertions(1);
    const getBeforePost =  await functions.getAllReviews();
    //console.log("here")
    const post = await functions.postOneReview();
    //console.log("afterhere")
    const getAfterPost =  await functions.getAllReviews();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});
test("getting all reviews",async()=>{
    expect.assertions(1)
    const response = await functions.getAllReviews();
    expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});
 // here we delete the last one only
 
 test("getting one review by ID",async()=>{
    expect.assertions(1);
    const getAll = await functions.getAllReviews();
    const reviewID = getAll.data.data[getAll.data.data.length-1]["_id"];
    const getOne = await functions.getOneReview(reviewID);
    //console.log(getOne.data)
    expect(getOne.data.review["_id"]).toBe(reviewID)
  });
  
  test("putting one review",async()=>{
    expect.assertions(1);
    const get = await functions.getAllReviews();
    const id = get.data.data.length-1
    const put = await functions.putOneReview(get.data.data[id]["_id"]);
    const getOne = await functions.getOneReview(get.data.data[id]["_id"]);
    //console.log(getOne.data)
    expect(getOne.data.review["comment"]).toBe("EDITED cashcash BABY")
  });
  
  // test("deleting one review",async()=>{
  //     expect.assertions(1)
  //     const getBefore = await functions.getAllReviews();
  //     const id = getBefore.data.data.length-1
  //     //console.log(id)
  //     const deleted = await functions.deleteOnereview(getBefore.data.data[id]["_id"]);
  //     //console.log(id)
  //     const getAfter = await functions.getAllReviews();
  //     expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
  // });

//------------------------------------------------------------((Event Request))----------------------------------------------------------------------------------------------

test("posting one eventRequest",async()=>{
    expect.assertions(1);
    const getBeforePost = await functions.getAllEventRequest();
    const post = await functions.postEventRequest();
    const getAfterPost = await functions.getAllEventRequest();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});

test("getting all items in eventRequest",async()=>{
  expect.assertions(1)
  const response = await functions.getAllEventRequest();
  expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});

test("getting one eventRequest by ID",async()=>{
  // expect.assertions(1);
  const getAll = await functions.getAllEventRequest();
  const eventRequestID = getAll.data.data[getAll.data.data.length-1]["_id"];
  const getOne = await functions.getOneEventRequest(eventRequestID);
  expect(getOne.data[0]["_id"]).toBe(eventRequestID)
});

test("putting one eventRequest",async()=>{
  expect.assertions(1);
  const get = await functions.getAllEventRequest();
  const id = get.data.data.length-1
  const put = await functions.putOneEventRequest(get.data.data[id]["_id"]);
  const getOne = await functions.getOneEventRequest(get.data.data[id]["_id"]);
  expect(getOne.data[0]["type"]).toBe("hals")
});

test("deleting one eventRequest",async()=>{
  expect.assertions(1)
  const getBefore = await functions.getAllEventRequest();
  const id = getBefore.data.data.length-1
  const deleted = await functions.deleteOneEventRequest(getBefore.data.data[id]["_id"]);
  const getAfter = await functions.getAllEventRequest();
  expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});


test("Searching tasks by payment",async()=>{
  // expect.assertions(1)
  functions.postSpecificTask()
 
  const getAll = await functions.getAllTasks()
  const index = Math.floor(Math.random()*getAll.data.data.length)
  const money = getAll.data.data[index]["payment"]
  const resultSet = await functions.searchTcasksByPayment(money)
  let match = true;
  
  for(let i=0;i<resultSet.data.data.length;i++){
      if(!((resultSet.data.data[i]["payment"]>=(money)+50)||(resultSet.data.data[i]["payment"]<=(money)+50))) match=false
  }
  expect(match).toBeTruthy();
});
//--------------------------------------------------------(Events)--------------------------------------------------------------------------

// test('Getting All The Events ' , async()=>{
//      expect.assertions(1)
//     allEvents = await functions.getAllEvents()

//    // //console.log(allEvents)
// });

test("Searching for an Event by ID ", async () => {
    // expect.assertions(1)
    const theEvent = await functions.getAnEventByID("5c9534d9245cba7ddab501dc"); // this is and ID from the test DB
    const id = theEvent.data.data._id;
    expect(id).toEqual("5c9534d9245cba7ddab501dc");
  });
  
  //gimme an err 
  // test("Searching for a non existent Event by ID ", async  () => {
    
  //   const eve = await  functions.getAnEventByID("5c9534d9245cba7ddab501dD")
  //   //console.log(eve)
  
  //    expect(Object.keys(eve.data.data)).toContainEqual({error: 'The Event you are tryinig to show does not exist '})
  
  // });
  
  test("Getting an Event By Location Of City , Area and Street ", async () => {
    const theEvents = await functions.getAnEventUsingLocation(
      "cairo",
      "rehab",
      "youssef el sebaie"
    ); // also this an instance in the DB
    const len = theEvents.data.data.length;
    expect(len).toBeGreaterThanOrEqual(1);
  });
  
  test("Getting non existent Event By Location Of City , Area and Street ", async () => {
    const theEvents = await functions.getAnEventUsingLocation(
      "hurghada",
      "al dahar",
      "al moror al kadeem "
    ); // also this an instance in the DB
    const len = theEvents.data.data.length;
    expect(len).toEqual(0);
  });
  
  
  test ("searching for an event by type " , async() => { 
      const theEvents = await functions.getAnEventByType(";new;old")
      const len = theEvents.data.data.length 
      expect(len).toBeGreaterThanOrEqual(1);
  
  });
  // test ("searching for non existent event by type " , async () => { 
  //     const eve = await functions.getAnEventByType("Haribo")
  //     //console.log(eve.status)
  //     // const msg = eve._errorDetails._status ; 
  //     expect(msg).toEqual("404")
  
      
  
  // })
  
  test ("posting a new event " , async()=>{
      const params = {
          location: 
              {  
                  city :"hurghada",
                  Street :"al mamsha" , 
                  Area : "al kawathar"
              }
          , 
          description: "event in hurghada kabf kjb kjabsfk bakdfb akbf kjabfkj habjfbh ajsfhb jabshf jhbasfj akjafsb kjb ",
          type: "for fun ",
          registrationPrice: 150,
          numberOfSpaces: 199,
          speakers: ["ashry" , "akkad"],
          topics: ["the dilemma of not having fun "],
          dateTime: new Date(),
          organizerId: "5c9556fc528e180fd91a0b1b",
          numberOfRegisterations:50,
          eventRequestId: "5c9556fc528e180f121a0b1b" , 
          rate : 4 
      }
      const newEvent = await functions.postNewEvent(params)
      expect(newEvent.data.data.description).toEqual("event in hurghada kabf kjb kjabsfk bakdfb akbf kjabfkj habjfbh ajsfhb jabshf jhbasfj akjafsb kjb ")
  });
  
  
  test("editing an event " , async() => {
  
      const params = {
          description : "this a meaningless description used for testing and just help me exceed the thirt charachters i wish to exceedddddddddddddddddddddddddddddddd "
      }
      const updatedEvent = await functions.updatingAnEvent("5c9534d9245cba7ddab501dc" , params)
      //console.log(updatedEvent.config.data)
      expect(updatedEvent.config.data).toEqual(`{"description":"this a meaningless description used for testing and just help me exceed the thirt charachters i wish to exceedddddddddddddddddddddddddddddddd "}`) ; 
  
  });
  
  test ("deleting an Event " , async()=> { 
      const allBefore = await functions.getAllEvents()
      const id = allBefore.data.data.length-1
      const deletedEvent = await functions.deleteAnEvent(allBefore.data.data[id]["_id"])
      const allAfter = await functions.getAllEvents()
      expect(allAfter.data.data.length).toBe(allBefore.data.data.length - 1 ) 
  
  })

  //--------------------------------------------------------(User)--------------------------------------------------------------------------

//test creating a member 
                                                          
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
    const response= await functions.createMemberUser(body)
   // //console.log(response)
    expect(response.data.data.email).toBe("takeCareAgain55555@gmail.com");
})

// //test creating a partner                                                           //////////////THIS IS WORKING
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
     await functions.createPartnerUser(body)
     const response= await functions.getSpecifiedUser()
     //console.log(response)
     expect(response.data.email).toBe("yalabinaaaaa@yahoo.com");
 })


// //test creating a Agency      
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
        await functions.createAgencyUser(body)
     const response= await functions.getSpecifiedUser()
     ////console.log(response)
     expect(response.data.email).toBe("agencyemail66@gmail.com");
 })

// //test getting a specified user                                                       //////////////THIS IS WORKING
test ('gets the last user by id',async ()=> {
    expect.assertions(1);
    const response =await functions.getSpecifiedUser();
   // //console.log(response)
    expect(response.data.email).toBe("agencyemail66@gmail.com");
});

// // //test getting all members                                                              //////////////THIS IS WORKING
test ('gets all members',async ()=> {
    expect.assertions(1);
    const response =await functions.getAllMembers();
  //  //console.log(response)
    expect(response.data.data[response.data.data.length-1].email).toBe("takeCareAgain55555@gmail.com");
});

// // //test getting all users                                                              //////////////THIS IS WORKING
test ('gets all users',async ()=> {
    expect.assertions(1);
    const response =await functions.getAllUsers();
    ////console.log(response)
    expect(response.data.data[response.data.data.length-1].email).toBe("agencyemail66@gmail.com");
});


// // //test deleting a user 
test ('after deleting a user their number should decrease by one',async ()=> {
    expect.assertions(1);
    const response =await functions.getAllUsers();
    const initialSize = response.data.data.length
    //console.log(initialSize)
    const deleted = await functions.deleteSpecificUser()
    //console.log(deleted)
   const res = await functions.getAllUsers()
   const afterSize = res.data.data.length
    expect(initialSize-afterSize).toBe(1);
});

// //test updating a user

test('updating the website of a user',async ()=>{
    expect.assertions(1);
    body={
        "name":"name"
    }
   // const  lastUserEmail =await functions.getSpecifiedUser().data.email
   // //console.log("eamil before update"+lastUserEmail)
    const response=await functions.updateSpecificUser(body)
   // //console.log("eamil after update"+response.data.email)
   //console.log(response)
   const res = await functions.getSpecifiedUser()
    expect(res.data.name).toBe("name");
});

//test searching for event by location
test('loop for all results to be sure that they are in that location',async()=>{
    expect.assertions(1)
    let flag = true;
    const events = await functions.searchEventByLocation("cairo","youssef el sebaie","rehab")
   // //console.log(events.data)
    for (let i =0 ; i<events.data.length;i++){
       if (events[0].Area!='rehab'){
           flag=false
       }
    }
    expect(flag).toBeTruthy();
});


//-----------------------------------------------------------------((eventBooking))---------------------------------------------

test("posting one eventBooking",async()=>{
    expect.assertions(1);
    const getBeforePost = await functions.getAllEventBooking();
    const post = await functions.postOneEventBooking();
    const getAfterPost = await functions.getAllEventBooking();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});

test("getting all items in eventBooking",async()=>{
  expect.assertions(1)
  const response = await functions.getAllEventBooking();
  expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});

test("getting one eventBooking by ID",async()=>{
  expect.assertions(1);
  const getAll = await functions.getAllEventBooking();
  const eventBookingID = getAll.data.data[getAll.data.data.length-1]["_id"];
  const getOne = await functions.getOneEventBooking(eventBookingID);
  expect(getOne.data["_id"]).toBe(eventBookingID)
});

test("putting one eventBooking",async()=>{
  expect.assertions(1);
  const get = await functions.getAllEventBooking();
  const id = get.data.data.length-1
  const put = await functions.putOneEventBooking(get.data.data[id]["_id"]);
  const getOne = await functions.getOneEventBooking(get.data.data[id]["_id"]);
  expect(getOne.data["paymentMethod"]).toBe("EDITED cashcash BABY")
});


test("deleting one eventBooking",async()=>{
  expect.assertions(1)
  const getBefore = await functions.getAllEventBooking();
  const id = getBefore.data.data.length-1
  const deleted = await functions.deleteOneEventBooking(getBefore.data.data[id]["_id"]);
  const getAfter = await functions.getAllEventBooking();
  expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});

test("Searching tasks by category",async()=>{
  expect.assertions(1)
  functions.postSpecificTask()
  const getAll = await functions.getAllTasks()
  const index = Math.floor(Math.random()*getAll.data.data.length)
  const cat = getAll.data.data[index]["category"]
  const resultSet = await functions.searchTasksByCategory(cat)
  let match = true;
  for(let i=0;i<resultSet.data.data.length;i++){
      if(!resultSet.data.data[i]["category"]==(cat)) match=false
  }
  expect(match).toBeTruthy();
});

test("Searching tasks by experience",async()=>{
  //expect.assertions(1)
  functions.postSpecificTask()
  const getAll = await functions.getAllTasks()
  const index = Math.floor(Math.random()*getAll.data.data.length)
  const exp = getAll.data.data[index]["yearsOfExperience"]
  //console.log("here at search")
  const resultSet = await functions.searchTcasksByYearsOfExp(exp)
  let match = true;
  for(let i=0;i<resultSet.data.data.length;i++){
      if(!resultSet.data.data[i]["yearsOfExperience"]==(exp)) match=false
  }
  expect(match).toBeTruthy();
});

//-----------------------------------------------------------------((Notification))---------------------------------------------

test("creating a new  notification", async () => {
   
    //jest.setTimeout(3000)
    expect.assertions(1)
    const getbefore = await functions.getAllNotifications()
    const postRes = await functions.postOneNotification()
    const getall = await functions.getAllNotifications()
    expect(getall.data.data.length).toBe(getbefore.data.data.length+1);
    
  
});

// test Get all notifications 
test("Get all notifications", async() => {
    //jest.setTimeout(3000)
    expect.assertions(1);
    const getRes = await functions.getAllNotifications()
    expect(getRes.data.data.length).toBeGreaterThanOrEqual(1)
});

//test Getting a specific notification
test("Get a specific notification", async() => {
   
    expect.assertions(1);
    const getall = await functions.getAllNotifications()
    const getOne = await functions.getSpecificNotification()
    const id = getall.data.data[0]._id
    expect(getOne.data.notification._id).toEqual(id)
    
});

//testing updating a notification
 test("Updating Notification", async() => {
   expect.assertions(1);
   const putRes = await functions.updatingAnotification()
   expect(putRes.data.data.n).toEqual(1)
});


//tested Delete notification
test("Deleting Notification",async() => {
    expect.assertions(1);
    const delRes =  await functions.deleteNotification()
    expect(delRes.data.msg).toEqual("Notification was deleted successfully")
});

//--------------------------------------------------------------------((Application))-------------------------------------------------------------------------

const config ={
  id:null,
  applicantId :null,
  taskId : null,
  date:null,
  acceptance:null
}

test('Randomly creating a new application',async () => {
    const response =  await functions.postApplication();
    // check if the json response has data not error
    expect(Object.keys(response.data)).toContain('data');
    expect(Object.keys(response.data)).not.toContain('error');

    const application = await functions.getApplication(response.data.data["_id"]);
    expect(application.data.data).toMatchObject(response.data.data);
    config.id = application.data.data._id;
    config.applicantId = application.data.data.applicantId;
    config.taskId = application.data.data.taskId;
    config.date=application.data.data.date;
    config.acceptance=application.data.data.acceptance;
  });

  test('Fetching the data of that random application', async () => {
    const response =  await functions.getApplication(config.id);
     // check if the json response has data not error
     expect(Object.keys(response.data)).toContain('data');
     expect(Object.keys(response.data)).not.toContain('error');

    expect(response.data.data.applicantId).toEqual(config.applicantId)
    expect(response.data.data.taskId).toEqual(config.taskId)
    expect(new Date(response.data.data.date)).toEqual(new Date(config.date))
    expect(response.data.data.acceptance).toEqual(config.acceptance)
  });

  test('Updating the data of that random application', async () => {
    const response =  await functions.updateApplication(config.id);
    // check if the json response has data not error
    expect(Object.keys(response.data)).toContain('data');
    expect(Object.keys(response.data)).not.toContain('error');

    const application = await functions.getApplication(config.id);
    expect(application.data.data).not.toEqual(null);
    expect(application.data.data.date).toEqual("2017-04-30T23:34:28.802Z");
    expect(application.data.data.acceptance).toBe(1);
    config.id = application.data.data._id;
    config.applicantId = application.data.data.applicantId;
    config.taskId = application.data.data.taskId;
    config.date=application.data.data.date;
    config.acceptance=application.data.data.acceptance;
  });

  test(`Deleting that random application`, async () => {
    const lengthBefor =await functions.getAllApplication();
    await functions.deleteApplication(config.id);
    const lengthAfter =await functions.getAllApplication();
    expect((lengthBefor.data.data.length)-(lengthAfter.data.data.length)).toBe(1);
  });

