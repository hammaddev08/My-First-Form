const express = require("express");
const mongoose = require("mongoose");

const { Form } = require("./model");

const app = express();
app.use(express.json());
mongoose.connect("mongodb://nextwave364_db_user:YFbVWJkEW9m9Nogx@ac-nm7iaih-shard-00-00.goabuj2.mongodb.net:27017,ac-nm7iaih-shard-00-01.goabuj2.mongodb.net:27017,ac-nm7iaih-shard-00-02.goabuj2.mongodb.net:27017/?ssl=true&replicaSet=atlas-oet95l-shard-0&authSource=admin&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.post("/forms", (req, res) => {
  const { name, email, attendence } = req.body;
  const newForm =  Form({ name, email, attendence });
  newForm.save()
    .then(() => {
      res.status(201).json({ message: "Form created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create form" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});