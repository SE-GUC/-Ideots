const funcs = require('../../functions/application_functions');

const config ={
  id:null,
  applicantId :null,
  taskId : null,
  date:null,
  acceptance:null
}

test('Randomly creating a new application',async () => {
    expect.assertions(3);
    const app = {
        applicantId: "5c9fe28433caec2078bfa349",
        taskId:"5c9556fc528e180fd91a0b1b"
    }
    const response =  await funcs.postApplication(app);
    // check if the json response has data not error
    expect(Object.keys(response.data)).toContain('data');
    expect(Object.keys(response.data)).not.toContain('error');

    const application = await funcs.getApplication(response.data.data["_id"]);
    expect(application.data.data).toMatchObject(response.data.data);
    config.id = application.data.data._id;
    config.applicantId = application.data.data.applicantId;
    config.taskId = application.data.data.taskId;
    config.date=application.data.data.date;
    config.acceptance=application.data.data.acceptance;
  });

  test('Fetching the data of that random application', async () => {
    expect.assertions(6);
    const response =  await funcs.getApplication(config.id);
     // check if the json response has data not error
     expect(Object.keys(response.data)).toContain('data');
     expect(Object.keys(response.data)).not.toContain('error');

    expect(response.data.data.applicantId).toEqual(config.applicantId)
    expect(response.data.data.taskId).toEqual(config.taskId)
    expect(new Date(response.data.data.date)).toEqual(new Date(config.date))
    expect(response.data.data.acceptance).toEqual(config.acceptance)
  });

  test('Updating the data of that random application', async () => {
    expect.assertions(5);
    const app = {
        date:"2017-04-30T23:34:28.802Z",
        acceptance:1
    }
    const response =  await funcs.updateApplication(config.id,app);
    // check if the json response has data not error
    expect(Object.keys(response.data)).toContain('data');
    expect(Object.keys(response.data)).not.toContain('error');

    const application = await funcs.getApplication(config.id);
    expect(application.data.data).not.toEqual(null);
    expect(application.data.data.date).toEqual("2017-04-30T23:34:28.802Z");
    expect(application.data.data.acceptance).toBe(1);
    config.id = application.data.data._id;
    config.applicantId = application.data.data.applicantId;
    config.taskId = application.data.data.taskId;
    config.date=application.data.data.date;
    config.acceptance=application.data.data.acceptance;
  });

  test(`Deleting that random application and test getallapplications`, async () => {
    expect.assertions(1);
    const lengthBefor =await funcs.getAllApplication();
    await funcs.deleteApplication(config.id);
    const lengthAfter =await funcs.getAllApplication();
    expect((lengthBefor.data.data.length)-(lengthAfter.data.data.length)).toBe(1);
  });

  test('Check if validaion return status 400 in post function', async()=>{
    try{
        expect.assertions(1);
        const app = {
            taskId:"5c9556fc528e180fd91a0b1b"
        }
        await funcs.postApplication(app);
    }catch(error){
        expect(error.response.status).toBe(400)
    }
  });
  test('Check if validaion return status 400 in put function', async()=>{
    try{
        expect.assertions(1);
        const app = {
            date:"2017-04-30T23:34:28.802Z",
            acceptance:"fff"
        }
        await funcs.updateApplication(config.id,app);
    }catch(error){
        expect(error.response.status).toBe(400)
        }
   });
   test('Check if getapplication return status 404 if id not found', async()=>{
    try{
        expect.assertions(1);
        await funcs.getApplication(config.id);
    }catch(error){
        expect(error.response.status).toBe(404)
    }
   });