const PORT = 8800;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/userdata");
  console.log("DB Connected");
}

const userSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const User = mongoose.model("User", userSchema);

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 500,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    const user = new User({
      question: req.body.message,
      answer: data.choices[0].message.content,
    });
    const results= await user.save();
    console.log(results,"line no 54");

  } catch (error) {
    console.error(error, "post");
  }
});

app.get("/userdata", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    const val = res.json(users);
    console.log(val, "value");
  } catch (error) {
    console.error(error, "get");
  }
});

console.log("hi");
app.get("/", (req, res) => res.send("hello world"));
app.listen(PORT, () => console.log(`YOUR SERVER IS RUNNING ON PORT : ${PORT}`));
