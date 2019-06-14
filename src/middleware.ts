import { INextFunction, SuGoRequest, SuGoResponse } from "@sugo/server";
import { format } from "util";
import logger from "./logger";

export const errorHandler = async (
  req: SuGoRequest,
  res: SuGoResponse,
  next?: INextFunction
) => {
  try {
    return next ? await next() : null;
  } catch (err) {
    const defaultError = {
      code: err.code || "N/A",
      message: err.message || "Unexpected Error",
      name: err.name || err.constructor.name || "Error",
      stack: err.stack,
      status: err.status || 500
    };
    const json: any = Object.assign(defaultError, err);
    res.status(json.status).json(json);
  }
};

export const logRequest = async (
  req: SuGoRequest,
  res: SuGoResponse,
  next?: () => any
) => {
  let log: string = format(
    "Request ID: ( %s ) %s: %s",
    req.id,
    req.method,
    req.url
  );
  log += format(" --> query %j", req.query);
  log += format(" --> body %j", req.body);
  logger.info(log);
  return next ? await next() : null;
};

export const logResponse = async (
  req: SuGoRequest,
  res: SuGoResponse,
  next?: () => any
) => {
  next ? await next() : null;
  const now = new Date().toISOString();
  const { id, statusCode, statusMessage, body, method, url } = res;
  const log = `${now}: Response ID: ( ${id} ) ${method}: ${url} ${statusCode} ${statusMessage} ---> body: ${JSON.stringify(
    body
  )}`;
  if (statusCode >= 400) {
    logger.error(log);
  } else {
    logger.info(log);
  }
  return;
};
