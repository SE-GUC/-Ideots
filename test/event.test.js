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

})
// test ("searching for non existent event by type " , async () => { 
//     const eve = await fn.getAnEventByType("Haribo")
//     expect(Object.keys(eve.data.data)).toContain("Error")

    

// })
