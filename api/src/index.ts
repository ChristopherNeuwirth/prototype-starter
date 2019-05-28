import cors from 'cors';
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get('/api/hello', (req, res) => {
  console.log('LOG: ', req.route, req.headers);
  res.status(200).send('Hello World.');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
