const date = new Date();

class ResponseUtil {
  constructor() {}

  responseError(code, status, message) {
    const error = {
      timestamp: date.toISOString(),
      status: status,
      code: code,
      message: message,
    };

    return error;
  }
}

module.exports = ResponseUtil;

