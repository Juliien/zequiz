const express = require('express');
const app = express();

app.use(express.static('./dist/zequiz'));
app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/zequiz/'}),
);

app.listen(8080);
