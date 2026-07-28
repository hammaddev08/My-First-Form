const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = 3000;
app.use(express.json());

app.use(routes);
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});