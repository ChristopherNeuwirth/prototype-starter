// import { NestFactory } from '@nestjs/core';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { AppModule } from './app.module';
// import serverless from 'serverless-http';
// import express from 'express';

// const server = express();

// server.use('/.netlify/dist'); // path must route to lambda

// export const createNestServer = async expressInstance => {
//   const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
//   app.enableCors();
//   return app.init();
// };

// createNestServer(server)
//   .then(v => console.log('Nest Ready'))
//   .catch(err => console.error('Nest broken', err));

// export const handler = serverless(server);

export const handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World'
  });
};
