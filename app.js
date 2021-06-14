const express = require("express");
const students = require("./data/students.json");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res, next) => {
  res.render("home", { students: students });
});

app.get("/search", (req, res, next) => {
  const { search } = req.query;
  const searchResults = students.filter(
    (s) =>
      s.name.includes(search) ||
      s.lastName.includes(search) ||
      s.username.includes(search)
  );
  res.render("home", { students: searchResults });
});

app.get("/students/:username", (req, res, next) => {
  const { username } = req.params;
  const student = students.find((s) => s.username === username);
  res.render("student", student);
});

app.get("/contact", (req, res, next) => {
  res.render("contact");
});

app.post("/contact", (req, res, next) => {
  // ... send message to somewhere...
  console.log(req.body);
  res.render("home", { students, message: "Thanks for your message!" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
