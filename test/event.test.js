const fn = require("../functions/eventFunctions");

// test('Getting All The Events ' , async()=>{
//      expect.assertions(1)
//     allEvents = await fn.getAllEvents()

//    // console.log(allEvents)
// });

test("Searching for an Event by ID ", async () => {
  // expect.assertions(1)
  const theEvent = await fn.getAnEventByID("5c9534d9245cba7ddab501dc"); // this is and ID from the test DB
  const id = theEvent.data.data[0]._id;
  expect(id).toEqual("5c9534d9245cba7ddab501dc");
});

//gimme an err 
// test("Searching for a non existent Event by ID ", async  () => {
  
//   const eve = await  fn.getAnEventByID("1212123131313131315")
//    expect(Object.keys(eve.data.data)).toContainEqual({error: 'The Event you are tryinig to show does not exist '})

// });

test("Getting an Event By Location Of City , Area and Street ", async () => {
  const theEvents = await fn.getAnEventUsingLocation(
    "cairo",
    "rehab",
    "youssef el sebaie"
  ); // also this an instance in the DB
  const len = theEvents.data.data.length;
  expect(len).toBeGreaterThanOrEqual(1);
});

test("Getting non existent Event By Location Of City , Area and Street ", async () => {
  const theEvents = await fn.getAnEventUsingLocation(
    "hurghada",
    "al dahar",
    "al moror al kadeem "
  ); // also this an instance in the DB
  const len = theEvents.data.data.length;
  expect(len).toEqual(0);
});


test ("searching for an event by type " , async() => { 
    const theEvents = await fn.getAnEventByType(";new;old")
    const len = theEvents.data.data.length 
    expect(len).toBeGreaterThanOrEqual(1);

});
test ("searching for non existent event by type " , async () => { 
    const eve = await fn.getAnEventByType("Haribo")
    console.log(eve.status)
    // const msg = eve._errorDetails._status ; 
    expect(msg).toEqual("404")

    

})

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
    const newEvent = await fn.postNewEvent(params)
    expect(newEvent.data.data.description).toEqual("event in hurghada kabf kjb kjabsfk bakdfb akbf kjabfkj habjfbh ajsfhb jabshf jhbasfj akjafsb kjb ")
});


test("editing an event " , async() => {

    const params = {
        description : "this a meaningless description used for testing and just help me exceed the thirt charachters i wish to exceedddddddddddddddddddddddddddddddd "
    }
    const updatedEvent = await fn.updatingAnEvent("5c9534d9245cba7ddab501dc" , params)
    console.log(updatedEvent.config.data)
    expect(updatedEvent.config.data).toEqual(`{"description":"this a meaningless description used for testing and just help me exceed the thirt charachters i wish to exceedddddddddddddddddddddddddddddddd "}`) ; 

});

test ("deleting an Event " , async()=> { 
    const allBefore = await fn.getAllEvents()
    const id = allBefore.data.data.length-1
    const deletedEvent = await fn.deleteAnEvent(allBefore.data.data[id]["_id"])
    const allAfter = await fn.getAllEvents()
    expect(allAfter.data.data.length).toBe(allBefore.data.data.length - 1 ) 

})