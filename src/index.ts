import { Server } from './Server';
import  config from './config/configuration';

const server: Server = new Server(config);
server.bootstrap();
server.run();
server.initSwagger();
