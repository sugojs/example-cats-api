import { EnvironmentConfigurationError } from './exceptions';

export const environment: { [key: string]: any } = {
  MONGODB_URI: 'mongodb://localhost:27017/example-cats-api',
  NODE_ENV: 'development',
  PORT: 3000,
};

for (const key in environment) {
  if (environment.hasOwnProperty(key)) {
    let value = process.env[key] || environment[key];
    if (value === null || value === undefined) {
      throw new EnvironmentConfigurationError(key);
    } else if (!isNaN(value)) {
      value = parseInt(value, 10) === value ? parseInt(value, 10) : parseFloat(value);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    environment[key] = value;
  }
}

process.env.NODE_ENV = environment.NODE_ENV;

export default environment;
