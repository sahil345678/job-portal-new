import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://60e6ccfcbffb1085f22213f70d4ca49f@o4509558232776704.ingest.us.sentry.io/4509564291383296",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  // Tracing
  // tracesSampleRate: 1.0, // Capture 100% of the transactions
});

Sentry.profiler.startProfiler();
