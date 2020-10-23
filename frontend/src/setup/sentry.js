import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import config from "../config";

export const setupSentry = () => {
    Sentry.init({
        dsn: config.sentryDSN,
        integrations: [
          new Integrations.BrowserTracing(),
        ],
        tracesSampleRate: 1.0,
      });
}