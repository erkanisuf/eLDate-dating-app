const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
///////////Imports
app.use(bodyParser.json());
////// Pre-settings
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

////Cors Allow

const usersRoute = require("./routes/users");
const flowersRoute = require("./routes/flowers");

app.use("/users", usersRoute);
app.use("/flowers", flowersRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//Routes
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
