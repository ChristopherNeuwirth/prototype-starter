import express from 'express';
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.get('/api/hello', (req, res) => {
  console.log('LOG: ', req);
  res.send(200, 'Hello World.');
});

app.listen(port, () => console.log(`Server running on port ${port}!`));
