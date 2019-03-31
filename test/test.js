const funcs = require('./function');

const config ={
  id:null,
  applicantId :null,
  taskId : null,
  date:null,
  acceptance:null
}

test('Randomly creating a new application',async () => {
    //expect.assertions(2);
    const response =  await funcs.postApplication();
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
    //expect.assertions(1);
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
    //expect.assertions(1);
    console.log(config.id)
    const response =  await funcs.updateApplication(config.id);
    console.log(response.data)
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
