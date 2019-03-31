const functions = require('./function')
  
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