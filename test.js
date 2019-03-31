/*
*/
const functions = require('./function')


test("Delete all records",async()=>{
    const delteAll=await functions.deleteAllTasks();
    const getAll = await functions.getAllTask();
    expect(getAll.data.data.length).toBe(0)

})

test("posting one task",async()=>{
    const getBeforePost = await functions.getAllTask();
    const post = await functions.postOneTask();
    const getAfterPost = await functions.getAllTask();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});

test("getting all items in Task",async()=>{
    expect.assertions(1)
    const response = await functions.getAllTask();
    expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});
test("getting one Task by ID",async()=>{
    expect.assertions(1);
    const getAll = await functions.getAllTask();
    const TaskID = getAll.data.data[getAll.data.data.length-1]["_id"];
    const getOne = await functions.getOneTask(TaskID);
    // expect(getOne.data.data["_id"]).toBe(TaskID)
    expect(getOne.data.task["_id"]).toBe(TaskID)
});

test("putting one Task",async()=>{
    expect.assertions(1);
    const get = await functions.getAllTask();
    // console.log(get.data.data)
    const id = get.data.data.length-1
    // console.log(id)
    const put = await functions.putOneTask(get.data.data[id]["_id"]);
    const getOne = await functions.getOneTask(get.data.data[id]["_id"]);
    // expect(getOne.data.data["done"]).toBe(true)
    expect(getOne.data.task["done"]).toBe(true)
});


test("deleting one Task",async()=>{
    expect.assertions(1)
    const getBefore = await functions.getAllTask();
    const id = getBefore.data.data[getBefore.data.data.length-1]["_id"]
    const deleted = await functions.deleteOneTask(id);
    const getAfter = await functions.getAllTask();
    // expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});