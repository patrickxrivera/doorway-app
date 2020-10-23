const Sentry = require("../sentry");

class ErrorHandler {
    static async run(err, req, res, next) {
      const message = ErrorHandler.parseError(err);
      Sentry.captureMessage(message);
      res.status(500).json({ message });
    }

    static parseError(err) {
      if (typeof(err) === "string") {
        return err;
      } else if (typeof(err.message) === "string") {
        return err.message;
      } else {
        return err.errors[0].message;
      }
    }
}

module.exports = ErrorHandler;