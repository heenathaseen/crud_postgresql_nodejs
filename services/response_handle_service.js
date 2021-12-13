const config = require("../config/app_config");
const cr = require("../entity/common_response");
const { validationResult } = require("express-validator");

const handleCommonResponse = async (successCb, response) => {
  try {
    return await successCb(
      //({ data }) => data
      /* for react */
      ({ data }) => response.set("Connection", "close").status(200).json(data)
    );
  } catch (error) {
    console.log(error);
    var code = config.errors[error];
    var r = cr.responseCb(
      cr.headerCb({ code: !code ? config.response_code.error : code })
    );
    return r;
    /* for react */
    //response.set("Connection", "close").status(200).send(r);
  }
};
const fieldValidationResponse = async (req, res, nextCb) => {
  const errors = validationResult(req);
  console.log(errors);
  !errors.isEmpty()
    ? res
        .set("Connection", "close")
        .status(200)
        .send({
          header: {
            code: config.response_code.field_validation,
          },
          error: errors.array(),
        })
    : nextCb();
};

module.exports = {
  handleCommonResponse,
  fieldValidationResponse,
};
