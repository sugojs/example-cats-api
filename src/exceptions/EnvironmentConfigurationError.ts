import { SuGoError } from "./SuGoError";

export class EnvironmentConfigurationError extends SuGoError {
  public key: string;

  constructor(key: string) {
    super(`Required environment variable "${key}" is missing`);
    this.status = 500;
    this.name = "EnvironmentConfigurationError";
    this.code = "EnvironmentConfigurationError";
    this.key = key;
  }
}
