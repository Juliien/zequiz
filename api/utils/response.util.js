const date = new Date();

class ResponseUtil {

  responseError(code, status, message) {
    return {
      timestamp: date.toISOString(),
      status: status,
      code: code,
      message: message,
    };
  }
}

module.exports = ResponseUtil;

