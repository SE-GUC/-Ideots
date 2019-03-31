/*
*/
const functions = require('./function')


test("Delete all records",async()=>{
    const delteAll=await functions.deleteAllTasks();
    const getAll = await functions.getAllTasks();
    expect(getAll.data.data.length).toBe(0)

})

test("posting one task",async()=>{
    const getBeforePost = await functions.getAllTasks();
    params = {
        partnerID :"123456789123456789123456" ,
        requiredSkills :["Self learning" , "self motivated"],
        consultancyID :"123456789123456789123456" ,
        description :"test the cruds",
        payment :13245            
        ,finalProduct: "https://drive.google.com/drive/folders/0BzEl8pp_zP5efnlONkxEb1NIM25zZ0lsa0NKdTgwWEk2LW40MkpHNnBhaXJsTFJrem9GZ2c?dti=395296137294031&fref=gc"
        ,timeLine : "2019-05-05"    
        ,state :"pending" 
        ,category :"MET" 
        ,yearsOfExperience : 12
        ,done : "false"
        ,ratePartnerDoer :3
        ,ratePartnerConsultancy :2
        ,assignedPerson :"123456789123456789123456"              
    }
    const post = await functions.postOneTask(params);
    const getAfterPost = await functions.getAllTasks();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});

test("getting all items in Task",async()=>{
    expect.assertions(1)
    const response = await functions.getAllTasks();
    expect(response.data.data.length).toBeGreaterThanOrEqual(0);
});
test("getting one Task by ID",async()=>{
    expect.assertions(1);
    const getAll = await functions.getAllTasks();
    const TaskID = getAll.data.data[getAll.data.data.length-1]["_id"];
    const getOne = await functions.getOneTask(TaskID);
    // expect(getOne.data.data["_id"]).toBe(TaskID)
    expect(getOne.data.task["_id"]).toBe(TaskID)
});

test("putting one Task",async()=>{
    expect.assertions(1);
    const get = await functions.getAllTasks();
    // console.log(get.data.data)
    const id = get.data.data.length-1
    // console.log(id)
    params = {
        done:true
    }
    const put = await functions.putOneTask(get.data.data[id]["_id"],params);
    const getOne = await functions.getOneTask(get.data.data[id]["_id"]);
    // expect(getOne.data.data["done"]).toBe(true)
    expect(getOne.data.task["done"]).toBe(true)
});


test("deleting one Task",async()=>{
    expect.assertions(1)
    const getBefore = await functions.getAllTasks();
    const id = getBefore.data.data[getBefore.data.data.length-1]["_id"]
    const deleted = await functions.deleteOneTask(id);
    const getAfter = await functions.getAllTasks();
    // expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});