import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';

export const app = express();

const headers = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Max-Age': '2592000',
  'Content-Type': 'application/json'
};
// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
};

export const router = express.Router();
router.use(cors(options));

router.get('/hello', (req, res) => {
  console.log(req.headers);
  res.status(200).json({ hello: 'world' });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda

router.options('*', cors(options));

export const handler = serverless(app);
