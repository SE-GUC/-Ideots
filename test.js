const axios =  require('axios')
const functions = require('./function')

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
    
    

