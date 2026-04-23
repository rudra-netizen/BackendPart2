const express = require("express");

const app = express(); // we successfully created the server in this step

app.get("/", (req, res) => {
  res.send("welcome to the home page");
});

let note = [];

//this is middleware
app.use(express.json());

app.post("/notes", (req, res) => {
  console.log(req.body);
  note.push(req.body);
  res.json({
    message: "sent successfully",
  });
});
app.get("/notes", (req, res) => {
  res.json(note);
});

app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete note[index];
  res.json({
    message: "deleted successfully",
  });
});

app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const { title } = req.body;
  note[index].title = title;
  res.json({
    message: "updated successfully",
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
