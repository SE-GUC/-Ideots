  const functions = require('./function')
  
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
    functions.postOneTask()
    const getAll = await functions.getAllTask()
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
    expect.assertions(1)
    functions.postOneTask()
    const getAll = await functions.getAllTask()
    const index = Math.floor(Math.random()*getAll.data.data.length)
    const exp = getAll.data.data[index]["yearsOfExperience"]
    const resultSet = await functions.searchTcasksByYearsOfExp(exp)
    let match = true;
    for(let i=0;i<resultSet.data.data.length;i++){
        if(!resultSet.data.data[i]["yearsOfExperience"]==(exp)) match=false
    }
    expect(match).toBeTruthy();
});

