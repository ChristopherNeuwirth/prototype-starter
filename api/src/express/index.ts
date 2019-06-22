import bodyParser from 'body-parser';
import express from 'express';
import serverless from 'serverless-http';

export const app = express();

export const router = express.Router();
router.get('/hello', (req, res) => {
  console.log(req.route, req.headers);
  res.status(200).json({ hello: 'world' });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda

export const handler = serverless(app);
