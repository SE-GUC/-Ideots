 const functions=require("./fnction")



test("posting one Review",async()=>{
    expect.assertions(1);
    const getBeforePost =  await functions.getAllReviews();
    console.log("here")
    const post = await functions.postOneReview();
    console.log("afterhere")
    const getAfterPost =  await functions.getAllReviews();
    expect(getAfterPost.data.data.length).toBe(getBeforePost.data.data.length+1)
});
test("getting all reviews",async()=>{
    expect.assertions(1)
    const response = await functions.getAllReviews();
    expect(response.data.data.length).toBeGreaterThanOrEqual(1);
});
 // here we delete the last one only
test("deleting one review",async()=>{
    expect.assertions(1)
    const getBefore = await functions.getAllReviews();
    const id = getBefore.data.data.length-1
    console.log(id)
    const deleted = await functions.deleteOnereview(getBefore.data.data[id]["_id"]);
    console.log(id)
    const getAfter = await functions.getAllReviews();
    expect(getAfter.data.data.length).toBe(getBefore.data.data.length-1)
});

test("getting one review by ID",async()=>{
    expect.assertions(1);
    const getAll = await functions.getAllReviews();
    const reviewID = getAll.data.data[getAll.data.data.length-1]["_id"];
    const getOne = await functions.getOneReview(reviewID);
    console.log(getOne.data)
    expect(getOne.data.review["_id"]).toBe(reviewID)
});

test("putting one review",async()=>{
    expect.assertions(1);
    const get = await functions.getAllReviews();
    const id = get.data.data.length-1
    const put = await functions.putOneReview(get.data.data[id]["_id"]);
    const getOne = await functions.getOneReview(get.data.data[id]["_id"]);
    console.log(getOne.data)
    expect(getOne.data.review["comment"]).toBe("EDITED cashcash BABY")
});


