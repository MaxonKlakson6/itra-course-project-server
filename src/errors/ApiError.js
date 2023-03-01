const { UNEXPECTED, UNAUTHORIZED } = require("../constants/errorMessages");

class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static badRequest(message) {
    throw new ApiError(400, message);
  }

  static internal() {
    return new ApiError(500, UNEXPECTED);
  }
  static unauthorized() {
    throw new ApiError(401, UNAUTHORIZED);
  }
  static forbidden(message) {
    throw new ApiError(403, message);
  }
}

module.exports = ApiError;
