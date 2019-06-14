import { ConsoleLoggerPlugIn, Logger } from "@sugo/logger";

export default new Logger().addPlugin(new ConsoleLoggerPlugIn());
