const funcs = require('./functions');

test('posting an admin',async () => {
expect.assertions(2)
const getBefore=await funcs.getadmins();
const postAdmin=await funcs.postAdmin();
expect(Object.keys(postAdmin)).not.toEqual(['error']);
const getAfter=await funcs.getadmins();
expect(getAfter.data.data.length).toBe(getBefore.data.data.length+1)
});

test("getting all admins ",async()=>{
  expect.assertions(2)
  const response = await funcs.getadmins();
  expect(Object.keys(response)).not.toEqual(['error']);
  expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});

test("getting one admin by ID",async()=>{
  expect.assertions(2);
  const getAll = await funcs.getadmins();
  const adminID = getAll.data.data[getAll.data.data.length-1]["_id"];
  const getOne = await funcs.getadmin(adminID);
  expect(Object.keys(getOne)).not.toEqual(['error']);
  expect(getOne.data["_id"]).toBe(adminID)
});

test("putting one admin",async()=>{
  expect.assertions(2);
  const get = await funcs.getadmins();
  const id = get.data.data.length-1
  const put = await funcs.updateAdmin(get.data.data[id]["_id"]);
  expect(Object.keys(put)).not.toEqual(['error']);
  const getOne = await funcs.getadmin(get.data.data[id]["_id"]);
  console.log(getOne.data)
  expect(getOne.data["email"]).toBe("fahd1@gmail.com")
});

test("deleting one admin",async()=>{
  expect.assertions(2)
  const getBefore = await funcs.getadmins();
  const id = getBefore.data.data.length-1
  const deleted = await funcs.deleteAdmin(getBefore.data.data[id]["_id"]);
  expect(Object.keys(deleted)).not.toEqual(['error']);
  const getAfter = await funcs.getadmins();
  expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});







