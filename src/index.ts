import { connect } from '@sugo/mongodb';
import { AddressInfo } from 'net';
import environment from './environment';
import logger from './logger';
import server from './server';

connect(environment.MONGODB_URI).then(() =>
  server
    .addListener('listening', () => logger.info('env: ', JSON.stringify(process.env, null, 1)))
    .addListener('listening', () => logger.info('Listening on: ', (server.address() as AddressInfo).port.toString()))
    .listen(3000),
);
