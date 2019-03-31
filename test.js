
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
    expect(getOne.data.data["_id"]).toBe(TaskID)
    // expect(getOne.data.task["_id"]).toBe(TaskID)
});

test("putting one Task",async()=>{
    expect.assertions(1);
    const get = await functions.getAllTasks();
    // console.log(get.data.data)
    const id = get.data.data.length-1
    // console.log(id)
    params = {
        done:true
    }
    const put = await functions.putOneTask(get.data.data[id]["_id"],params);
    const getOne = await functions.getOneTask(get.data.data[id]["_id"]);
    expect(getOne.data.data["done"]).toBe(true)
    // expect(getOne.data.task["done"]).toBe(true)
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
    const getBefore=await funcs.getadmins();
    const postAdmin=await funcs.postAdmin();
    expect(Object.keys(postAdmin)).not.toEqual(['error']);
    const getAfter=await funcs.getadmins();
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length+1)
    });
    
    test("getting all admins ",async()=>{
      expect.assertions(2)
      const response = await funcs.getadmins();
      expect(Object.keys(response)).not.toEqual(['error']);
      expect(response.data.data.length).toBeGreaterThanOrEqual(1);
    });
    
    test("getting one admin by ID",async()=>{
      expect.assertions(2);
      const getAll = await funcs.getadmins();
      const adminID = getAll.data.data[getAll.data.data.length-1]["_id"];
      const getOne = await funcs.getadmin(adminID);
      expect(Object.keys(getOne)).not.toEqual(['error']);
      expect(getOne.data["_id"]).toBe(adminID)
    });
    
    test("putting one admin",async()=>{
      expect.assertions(2);
      const get = await funcs.getadmins();
      const id = get.data.data.length-1
      const put = await funcs.updateAdmin(get.data.data[id]["_id"]);
      expect(Object.keys(put)).not.toEqual(['error']);
      const getOne = await funcs.getadmin(get.data.data[id]["_id"]);
      console.log(getOne.data)
      expect(getOne.data["email"]).toBe("fahd1@gmail.com")
    });
    
    test("deleting one admin",async()=>{
      expect.assertions(2)
      const getBefore = await funcs.getadmins();
      const id = getBefore.data.data.length-1
      const deleted = await funcs.deleteAdmin(getBefore.data.data[id]["_id"]);
      expect(Object.keys(deleted)).not.toEqual(['error']);
      const getAfter = await funcs.getadmins();
      expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
    });
    

    //-----------------------------------------------------------------((Review))---------------------------------------------

test("posting one Review",async()=>{
    expect.assertions(1);
    const getBeforePost =  await functions.getAllReviews();
    console.log("here")
    const post = await functions.postOneReview();
    console.log("afterhere")
    const getAfterPost =  await functions.getAllReviews();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});
test("getting all reviews",async()=>{
    expect.assertions(1)
    const response = await functions.getAllReviews();
    expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});
 // here we delete the last one only
test("deleting one review",async()=>{
    expect.assertions(1)
    const getBefore = await functions.getAllReviews();
    const id = getBefore.data.data.length-1
    console.log(id)
    const deleted = await functions.deleteOnereview(getBefore.data.data[id]["_id"]);
    console.log(id)
    const getAfter = await functions.getAllReviews();
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});

test("getting one review by ID",async()=>{
    expect.assertions(1);
    const getAll = await functions.getAllReviews();
    const reviewID = getAll.data.data[getAll.data.data.length-1]["_id"];
    const getOne = await functions.getOneReview(reviewID);
    console.log(getOne.data)
    expect(getOne.data.review["_id"]).toBe(reviewID)
});

test("putting one review",async()=>{
    expect.assertions(1);
    const get = await functions.getAllReviews();
    const id = get.data.data.length-1
    const put = await functions.putOneReview(get.data.data[id]["_id"]);
    const getOne = await functions.getOneReview(get.data.data[id]["_id"]);
    console.log(getOne.data)
    expect(getOne.data.review["comment"]).toBe("EDITED cashcash BABY")
});
    

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
  functions.postOneTask()
 
  const getAll = await functions.getAllTask()
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

//    // console.log(allEvents)
// });

test("Searching for an Event by ID ", async () => {
    // expect.assertions(1)
    const theEvent = await functions.getAnEventByID("5c9534d9245cba7ddab501dc"); // this is and ID from the test DB
    const id = theEvent.data.data._id;
    expect(id).toEqual("5c9534d9245cba7ddab501dc");
  });
  
  //gimme an err 
  test("Searching for a non existent Event by ID ", async  () => {
    
    const eve = await  functions.getAnEventByID("5c9534d9245cba7ddab501dD")
    console.log(eve)
  
     expect(Object.keys(eve.data.data)).toContainEqual({error: 'The Event you are tryinig to show does not exist '})
  
  });
  
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
  //     console.log(eve.status)
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
      console.log(updatedEvent.config.data)
      expect(updatedEvent.config.data).toEqual(`{"description":"this a meaningless description used for testing and just help me exceed the thirt charachters i wish to exceedddddddddddddddddddddddddddddddd "}`) ; 
  
  });
  
  test ("deleting an Event " , async()=> { 
      const allBefore = await functions.getAllEvents()
      const id = allBefore.data.data.length-1
      const deletedEvent = await functions.deleteAnEvent(allBefore.data.data[id]["_id"])
      const allAfter = await functions.getAllEvents()
      expect(allAfter.data.data.length).toBe(allBefore.data.data.length - 1 ) 
  
  })

  //--------------------------------------------------------()--------------------------------------------------------------------------