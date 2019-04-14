const Task = require("../models/Task");
const validator = require("../validations/taskValidations");
const Joi = require("joi");

exports.viewAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json({ data: tasks });
};

exports.viewOneTaskByID = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });
    if (!task) return res.status(400).send({ error: "Task does not exist" });
    return res.json({ task });
  } catch (error) {
    console.log(error);
  }
};

exports.getinRange = async (req, res) => {
  const schema = {
    limit: Joi.required(),
    offset: Joi.required()
  };
  const result = Joi.validate(req.params, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  const limit = parseInt(req.params.limit, 10);
  const offset = parseInt(req.params.offset, 10);
  const task = await Task.find()
    .skip(offset)
    .limit(limit);
  res.json({ data: task });
};

exports.updateOneTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const taskApplicant = req.body.applicant;

    const task = await Task.findById(taskID);
    if (!task) return res.status(400).send({ error: "Task does not exist" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    if (!taskApplicant) {
    } else {
      Task.update(
        { _id: taskID },
        { $addToSet: { applicants: taskApplicant } }
      );
    }
    const updatedTask = await Task.updateOne({ _id: taskID }, req.body);
    res.json({ msg: "Task updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteOneTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const deletedTask = await Task.findByIdAndRemove(taskID);
    if (!deletedTask)
      return res.status(400).send({ error: "task does not exist" });
    res.json({ msg: "Task was deleted successfully", data: deletedTask });
  } catch (error) {
    console.log(error);
  }
};

exports.postOneTask = async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newTask = await Task.create(req.body);
    res.json({ msg: "Task was created successfully", data: newTask });
  } catch (error) {
    console.log(error);
  }
};

exports.searchByCategory = async (req, res) => {
  const cat = req.params.cat;
  const tasks = await Task.find({ category: cat });
  return res.json({ data: tasks });
};

exports.searchByAssignedPerson = async (req, res) => {
  const cat = req.params.ap;
  const tasks = await Task.find({ assignedPerson: ap });
  return res.json({ data: tasks });
};

exports.searchByYearsOfEXP = async (req, res) => {
  const exp = req.params.exp;
  const tasks = await Task.find({ yearsOfExperience: exp });
  return res.json({ data: tasks });
};

exports.searchByMonetaryCompensation = async (req, res) => {
  const pay = req.params.pay;
  const min = Number(pay) - 50;
  const max = Number(pay) + 50;
  const tasks = await Task.find({ payment: { $lte: max, $gte: min } });
  return res.json({ data: tasks });
};

exports.getRecommendedTasks = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const userSkills = user.skills;
  const tasks = await Task.find({ requiredSkills: { $in: userSkills } });
  return res.json({ data: tasks });
};
