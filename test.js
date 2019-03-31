/**
 * @jest-environment node
 */

const notifications_test = require('./routes/api/notification');
const axios = require('axios');
const functions = require("./function")


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




