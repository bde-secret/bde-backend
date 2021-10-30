import {helloWorld} from './hello-world';

const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req: any, res: any) => {
  res.send(helloWorld());
});

app.listen(port, () => {
  console.log(helloWorld());
});
