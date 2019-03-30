/**
 * @jest-environment node
 */

const notifications_test = require('./routes/api/notification');
const axios = require('axios');
const functions = require("./function")


test("creating a new  notification", async () => {
   
    expect.assertions(1)
    const postRes = await functions.postOneNotification()
    expect(postRes.data.data.isRead).toEqual(false)
    expect(postRes.data.data.content).toEqual("hello brother")
    expect(postRes.data.data.recieverId).toEqual("54759eb3c090d83494e2d804")
    expect(postRes.data.data.notifierId).toEqual("54759eb3c090d83494e2d803")
    expect(postRes.data.data).toHaveProperty('date')
    expect(postRes.data.data).toHaveProperty('__v')
  
});

// test Get all notifications 
test("Get all notifications", async() => {
    expect.assertions(1);
    const getRes = await functions.getAllNotifications()
    expect(getRes.data.data[0].isRead).toEqual(false)
    expect(getRes.data.data[0].content).toEqual("hello brother")
    expect(getRes.data.data[0].recieverId).toEqual("54759eb3c090d83494e2d804")
    expect(getRes.data.data[0].notifierId).toEqual("54759eb3c090d83494e2d803")
    expect(getRes.data.data[0]).toHaveProperty('date')
    expect(getRes.data.data[0]).toHaveProperty('__v')
  
});

//test Getting a specific notification
test("Get a specific notification", async() => {
   expect.assertions(1);
    const getSRes = await functions.getSpecificNotification()
    expect(getSRes.data.notification.isRead).toEqual(false)
    expect(getSRes.data.notification.content).toEqual("hello brother")
    expect(getSRes.data.notification.recieverId).toEqual("54759eb3c090d83494e2d804")
    expect(getSRes.data.notification.notifierId).toEqual("54759eb3c090d83494e2d803")
    expect(getSRes.data.notification).toHaveProperty('date')
    expect(getSRes.data.notification).toHaveProperty('__v')
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



