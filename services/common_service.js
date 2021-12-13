var config = require("../config/app_config.json");
var cr_handle = require("../services/response_handle_service");
var cr = require("../entity/common_response");

/* Create */
function create(genericCb, response) {
  return cr_handle.handleCommonResponse(async (resCb) => {
    var result = await genericCb();
    return resCb({
      data: cr.responseCb(
        cr.headerCb({ code: config.response_code.success }),
        cr.bodyCb({ val: result })
      ),
    });
  }, response);
}

/* Update or Delete */

function updateOrDelete(genericCb, response) {
  return cr_handle.handleCommonResponse(async (resCb) => {
    var rowCount = await genericCb();
    return resCb({
      data: cr.responseCb(
        cr.headerCb({
          code:
            rowCount > 0
              ? config.response_code.success
              : config.response_code.error,
        })
      ),
    });
  }, response);
}

/* Get */

function get(genericCb, response) {
  return cr_handle.handleCommonResponse(async (resCb) => {
    var result = await genericCb();
    return resCb({
      data: cr.responseCb(
        cr.headerCb({
          code:
            result.length == 0
              ? config.response_code.empty_results
              : config.response_code.success,
        }),
        cr.bodyCb({ val: result })
      ),
    });
  }, response);
}

/* validation fails */

function validationFail(errors, response) {
  return cr_handle.handleCommonResponse(async (resCb) => {
    return resCb({
      data: cr.responseCb(
        cr.headerCb({
          code: config.response_code.field_validation,
        }),
        cr.bodyCb({ err: errors })
      ),
    });
  }, response);
}

/* dupication issue response */

function duplicationResponse(errors, response) {
  return cr_handle.handleCommonResponse(async (resCb) => {
    return resCb({
      data: cr.responseCb(
        cr.headerCb({ code: config.response_code.duplication_exception }),
        cr.bodyCb({
          err: errors,
        })
      ),
    });
  }, response);
}

/* check two arrays */
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* get junctionTable rows */

function getJunctionaTableRows(body, id) {
  var rows = [];
  body.forEach((element) => {
    let row = [id, element];
    rows.push(row);
  });
  return rows;
}



module.exports = {
  create,
  updateOrDelete,
  get,
  equals,
  validationFail,
  getJunctionaTableRows,
  duplicationResponse,
};
