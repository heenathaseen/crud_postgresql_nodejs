const db = require("../repo/db_connection");
const common_service = require("../services/common_service");
const query = require("../repo/db_queries");
var config = require("../config/app_config.json");
const { body } = require("express-validator");

const insertStudent = async (body) => {
  const client = await db.connect();
  try {
    const insertion = await client.query(query.insertStudent, [
     body.studId,
     body.studName,
      body.age,
      body.dept,
      body.mobNo,
     
    ]);
    return insertion.rows[0];
  } catch (error) {
    console.log("Error occured in student repo");
    console.log(error);
    throw new Error(error.code);
  } finally {
    client.release();
  }
};
const checkStudentExists = async (body) => {
  const client = await db.connect();

  try {
    const student = await client.query(query.checkStudentExists, [
      body.studId,
      body.studName,
       body.age,
       body.dept,
       body.mobNo,
      
    ]);
    return student;
  } catch (error) {
    console.log("Error occured at check student exists");
    console.log(error);
    throw new Error(error.code);
  } finally {
    client.release();
  }
};
const checkStudentExistsWithId = async (body) => {
  const client = await db.connect();

  try {
    const student = await client.query(query.checkStudentExistsWithId, [
      body.studId,
     
    ]);
    return student;
  } catch (error) {
    console.log("Error occured at check student exists");
    console.log(error);
    throw new Error(error.code);
  } finally {
    client.release();
  }
};
const getStudent = async (id) => {
  const client = await db.connect();
  try {
    const student = await client.query(query.getStudentById, [
      id,
    ]);
    return student.rows[0];
  } catch (error) {
    console.log("Error occured at get student");
    console.log(error);
    throw new Error(error.code);
  } finally {
    client.release();
  }
};
const getAllStudent = async () => {
  const client = await db.connect();
  try {
    const student = await client.query(query.getAllStudent, []);
    return student.rows.length > 0 ? student.rows : [];
  } catch (error) {
    console.log("Error occured at get student");
    console.log(error);
    throw new Error(error.code);
  } finally {
    client.release();
  }
};
const deleteStudent = async (id) => {
  const client = await db.connect();
  try {
    const student = await client.query(query.deleteStudentById, [
      id,
    ]);
    return student.rowCount;
  } catch (error) {
    console.log("Error occured at get Student");
    console.log(error);
    throw new Error(error.code);
  } finally {
    client.release();
  }
};
const updateStudent = async (body) => {
  const client = await db.connect();
  try {
    const updateStudent = await client.query(query.updateStudent, [
      body.studId,
      body.studName,
       body.age,
       body.dept,
       body.mobNo,
    ]);
    return updateStudent.rowCount;
  } catch (error) {
    console.log("Erro occured in student repo");
    console.log(error);
    throw new Error(error.code);
  } finally {
    client.release();
  }
};

module.exports = {
  insertStudent,
  getStudent,
  getAllStudent,
  updateStudent,
  deleteStudent
 
};
