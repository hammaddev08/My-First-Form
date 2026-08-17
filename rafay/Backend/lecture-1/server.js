const express = require('express');
const routes = require('./routes/routes');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});