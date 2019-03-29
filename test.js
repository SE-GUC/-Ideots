  const functions = require('./fn')
  
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
    console.log(getOne.data)
    expect(getOne.data["paymentMethod"]).toBe("EDITED cashcash BABY")
});

test("deleting one eventBooking",async()=>{
    expect.assertions(1)
    const getBefore = await functions.getAllEventBooking();
    const id = getBefore.data.data.length-1
    console.log(id)
    const deleted = await functions.deleteOneEventBooking(getBefore.data.data[id]["_id"]);
    const getAfter = await functions.getAllEventBooking();
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});