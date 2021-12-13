var cr_handle = require("../services/response_handle_service");
var config = require("../config/app_config.json");
var studentRepo = require("../repo/students_repo");
const { validationResult } = require("express-validator");
var cr = require("../entity/common_response");
const { insertStudent } = require("../repo/db_queries");

function createStudent(req, res) {
  console.log("Create student Request");
  const error = validationResult(req);
  try{
   return !error.isEmpty()
   ? cr_handle.fieldValidationResponse(res, error)
   : cr_handle.handleCommonResponse(async (successCb) => {
        var result = await studentRepo.insertStudent(req.body);
           return successCb({
               data: cr.responseCb(
                   cr.headerCb({ code: !result ?config.response_code.error_dbissue_serverissue : config.response_code.success })
                   // cr.bodyCb({ val: result })
               ),
           });
   }, res);
  }catch(error){
   return successCb({
       data: cr.responseCb(
           cr.headerCb({ code: error.message })
           // cr.bodyCb({ val: result })
       ),
   });
  }
}
function getStudentById(id, res) {
  return cr_handle.handleCommonResponse(async (resCb) => {
    var result = await studentRepo.getStudent(id);
    console.log("^^^^^^^");
    console.log(result);
    return resCb({
      data: cr.responseCb(
        cr.headerCb({
          code:
            result === undefined
              ? config.response_code.empty_results
              : config.response_code.success,
        }),
        cr.bodyCb({ val: result })
      ),
    });
  }, res);
}

function getAllStudent(req, res) {

  return cr_handle.handleCommonResponse(async (resCb) => {
    var result = await studentRepo.getAllStudent();
    return resCb({
      data: cr.responseCb(
        cr.headerCb({
          code:
            result.length > 0
              ? config.response_code.success
              : config.response_code.empty_results,
        }),
        cr.bodyCb({ val: result })
      ),
    });
  }, res);
}


function updateExistingStudent(req, res) {
  console.log("update student Request");
  const errors = validationResult(req);
  var errCode;
  var result;

  return !errors.isEmpty()
    ? cr_handle.fieldValidationResponse(res, errors)
    : cr_handle.handleCommonResponse(async (resCb) => {
        var studentExists = await studentRepo.checkstudentExistsWithId(
          req.body
        );
         if (studentExists.rowCount>0) {
          console.log("having data");
          result = await updateStudent(req.body);
          errCode = config.response_code.success;
        } else {
          console.log("no data");
          console.log(config.response_code.Not_Exist);
          errCode = config.response_code.Not_Exist;
        }
        return resCb({
          data: cr.responseCb(
            cr.headerCb({ code: errCode }),
            //cr.bodyCb({ val: result })
          )
        })
      }, res)
}

function deleteExistingStudent(req, res) {
  console.log("Create Student Request");

  return cr_handle.handleCommonResponse(async (resCb) => {
    var deleteStudent = await studentRepo.deleteStudent(req.params.id);
    return resCb({
      data: cr.responseCb(
        cr.headerCb({
          code:
            deleteStudent > 0
              ? config.response_code.success
              : config.response_code.error,
        })
      ),
    });
  }, res);
}




module.exports = {
  createStudent,
  getStudentById,
  getAllStudent,
  updateExistingStudent,
  deleteExistingStudent
};
