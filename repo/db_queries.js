

var insertStudent =
  "insert into student(studId,studName,age,dept,mobNo) values($1,$2,$3,$4,$5) RETURNING *";
var checkStudentExists =
  "select studId from student where (studId=$1 or mobNo=$5)";

var getStudentById = "select * from student where studId=$1";

var getAllStudent = "select * from student";

var updateStudent =
  "update student set studName=$2,age=$3,dept=$5,mobNo=$5 where studId=$1 RETURNING *";
var deleteStudentById = "delete from student where studId=$1";

module.exports = {
  insertStudent,
  checkStudentExists,
  getStudentById,
  getAllStudent,
  updateStudent,
  deleteStudentById

};
