import { getMiddleware as parseJsonBody } from "@sugo/body-parser-json";
import { createServer } from "@sugo/server";
import { errorHandler, logRequest, logResponse } from "./middleware";
import router from "./routes";

const server = createServer((req, res) => router.handle(req, res))
  .useMiddleware(errorHandler)
  .useMiddleware(parseJsonBody())
  .useMiddleware(logRequest)
  .useMiddleware(logResponse);

export default server;
