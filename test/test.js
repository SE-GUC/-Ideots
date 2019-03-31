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