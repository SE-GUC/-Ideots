/**
 * @jest-environment node
 */

const notifications_test = require('./routes/api/notification');
const axios = require('axios');

test("creating a new  notification", async () => {
    const bodyOfRequest = {
        content: "hello brother",
       recieverId: "54759eb3c090d83494e2d804",
       notifierId: "54759eb3c090d83494e2d803"
    }
    const postRes = await axios.post("http://localhost:3000/api/notification",bodyOfRequest);
    expect(postRes.data.data.isRead).toEqual(false)
    expect(postRes.data.data.content).toEqual("hello brother")
    expect(postRes.data.data.recieverId).toEqual("54759eb3c090d83494e2d804")
    expect(postRes.data.data.notifierId).toEqual("54759eb3c090d83494e2d803")
    expect(postRes.data.data).toHaveProperty('date')
    expect(postRes.data.data).toHaveProperty('__v')
  
});

// test Get all notifications 
test("Get all notifications", async() => {
    const getRes = await axios.get("http://localhost:3000/api/notification")
    expect(getRes.data.data[0].isRead).toEqual(false)
    expect(getRes.data.data[0].content).toEqual("hello brother")
    expect(getRes.data.data[0].recieverId).toEqual("54759eb3c090d83494e2d804")
    expect(getRes.data.data[0].notifierId).toEqual("54759eb3c090d83494e2d803")
    expect(getRes.data.data[0]).toHaveProperty('date')
    expect(getRes.data.data[0]).toHaveProperty('__v')
  
});
