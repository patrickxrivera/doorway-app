import * as Sentry from "@sentry/react";

class ErrorLogger {
    static send(error, data) {
        Sentry.captureException(new Error(error), {
            tags: data
        })
    }
}

export default ErrorLogger;