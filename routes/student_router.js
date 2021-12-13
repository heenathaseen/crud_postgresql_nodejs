var express = require("express");
var router = express.Router();
const validator_service = require("../services/validator_service");
const studentService = require("../services/student_service");
var config = require("../config/app_config.json");

router.post("/add", validator_service.validateStudent(), (req, res) => {
  return studentService.createStudent(req, res);
});
router.get("/get/:id", studentService.getStudentById);

// router.get("/get/:id",  async (req, res) => {
//   return studentService.getStudent(req, res)});
router.get("/getAll", async (req, res) => {
  return studentService.getAllStudent(req, res);
 });
 router.put("/update", validator_service.validateStudent(), (req, res) => {
  return employeeService.updateExistingStudent(req, res);
});
router.delete("/delete/:id", studentService.deleteExistingStudent);






module.exports = router;
