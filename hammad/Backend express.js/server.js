const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit', (req, res) => {
  // Handle form submission logic here
  const { name, email } = req.body;
  console.log(`Received form submission: Name - ${name}, Email - ${email}`);
  res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});