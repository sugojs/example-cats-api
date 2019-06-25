import { getMiddleware as parseJsonBody } from "@sugo/body-parser-json";
import { createServer, IHandler } from "@sugo/server";
import { errorHandler, logRequest, logResponse } from "./middleware";
import router from "./routes";
import * as helmet from "helmet";
// Compability fix made because the typings of helmetjs use the Express types, but
// it is still compatible with NodeJS IncomingMessage and ServerResponse
const helmetMiddleware: IHandler = (helmet() as unknown) as IHandler

const server = createServer((req, res) => router.handle(req, res))
  .useMiddleware(errorHandler)
  .useMiddleware(helmetMiddleware)
  .useMiddleware(parseJsonBody())
  .useMiddleware(logRequest)
  .useMiddleware(logResponse);

export default server;
