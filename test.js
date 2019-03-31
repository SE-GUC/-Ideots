/**
 * @jest-environment node
 */


 const axios =  require('axios')
 const functions = require('./function')
 


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

