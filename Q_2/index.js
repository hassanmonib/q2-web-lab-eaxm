console.clear();
const express = require("express");
const Post = require("./models/Post");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost/terminal")
  .then(() => {
    app.listen(5000, () => console.log("Mongodb connection is succesfull"));
  })
  .catch((err) => {
    console.log("Error in connecting MongoDB connection...");
    console.log(err);
  });
app.get("/posts", (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  Post.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.send(posts);
    });
});
