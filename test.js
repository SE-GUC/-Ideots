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
