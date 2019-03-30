const funcs = require('./functions');




test('posting an admin',async () => {

//  expect.assertions(1)
console.log("3dt awl wa7da")
const getBefore=await funcs.getadmins();
const postAdmin=await funcs.postAdmin();
console.log("3dt tany wa7da")
const getAfter=await funcs.getadmins();
console.log(getAfter.data)
//const id = getAfter.data.data.length-1

//await funcs.deleteAdmin(getAfter.data.data[id]["_id"])
expect(getAfter.data.data.length).toBe(getBefore.data.data.length+1)
});




test("getting all admins ",async()=>{
  expect.assertions(1)
  const response = await funcs.getadmins();
  expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});

test("getting one admin by ID",async()=>{
  expect.assertions(1);
  const getAll = await funcs.getadmins();
  const adminID = getAll.data.data[getAll.data.data.length-1]["_id"];
  const getOne = await funcs.getadmin(adminID);
  expect(getOne.data["_id"]).toBe(adminID)
});

test("putting one admin",async()=>{
  expect.assertions(1);
  const get = await funcs.getadmins();
  const id = get.data.data.length-1
  const put = await funcs.updateAdmin(get.data.data[id]["_id"]);
  const getOne = await funcs.getadmin(get.data.data[id]["_id"]);
  console.log(getOne.data)
  expect(getOne.data["email"]).toBe("fahd1@gmail.com")
});

test("deleting one admin",async()=>{
  expect.assertions(1)
  const getBefore = await funcs.getadmins();
  const id = getBefore.data.data.length-1
  console.log(id)
  const deleted = await funcs.deleteAdmin(getBefore.data.data[id]["_id"]);
  const getAfter = await funcs.getadmins();
  expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});


/*
test('getting all admins', async () => {
  //expect.assertions(1)
  const response =  await funcs.getadmins()
  const getone=await funcs.getadmin(response.data.admins[length-1]["_id"]);
  const response =  await funcs.getadmins()
  expect(response.data.admins).toEqual('soror')
});



test('updating an admin',async () => {

  

});


test('deleting an admin',async (id) => {

   // expect.assertions(1)
  
  const getBefore=await funcs.getadmins();
  const getone=await funcs.getadmin(id)
  console.log("3dt awl wa7da")
  const deleteAdmin=await funcs.deleteAdmin(id);
  console.log("3dt tany wa7da")
  const getAfter=await funcs.getadmins();
  console.log(getAfter.data)
  expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)

});

*/


