const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// We will be connecting using database
const Task = require("../../models/Task");
var taskController = require("../../controllers/taskController");

router.get("/", taskController.viewAllTasks);

router.get("/:id", taskController.viewOneTaskByID);

router.get("/WithRange/:limit/:offset", taskController.getinRange);

router.post("/", taskController.postOneTask);
router.put("/:id", taskController.updateOneTask);

router.delete("/:id", taskController.deleteOneTask);
// **searching for tasks**

//search by category
router.get("/search/category=:cat", taskController.searchByCategory);

router.get("/search/assignedPerson=:ap", taskController.searchByAssignedPerson);

router.get("/partner/partner", taskController.getmyTask);
//search by year of experience
router.get("/search/experience=:exp", taskController.searchByYearsOfEXP);

//search by monetary compensation *********************************************************************************************
router.get("/search/payment=:pay", taskController.searchByMonetaryCompensation);

//recommended tasks
router.get("/recommended/:id", taskController.getRecommendedTasks);

module.exports = router;
