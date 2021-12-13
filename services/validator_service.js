const { check } = require("express-validator");

function validateStudent() {
  return [
    check(
      "studName",
      "Name name must be minimum 5 letters and should not be empty"
    )
      .notEmpty()
      .isString(/^[a-z][a-zs]*$/)
      .isLength({ min: 5, max: 30 }),
    check("studId", "Id must be String and should not be empty")
      .isString()
      .notEmpty(),
    check(
      "age",
      "age must in number"
    )
      .isNumeric()
      .isLength({ min: 2, max: 2 })
      .notEmpty(),
    check(
      "mobNo",
      "Mobile should be 10 digits and numeric and should not be empty"
    )
      .isNumeric()
      .notEmpty(),
    check(
      "dept",
      "dept must be min 3")
      .isString()
      .isLength({ min: 3, max: 30 })

      .notEmpty(),

  ];
}

module.exports = {
  validateStudent,
};
