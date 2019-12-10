const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
// need to declare a "catch all" route on your express server
// that captures all page requests and directs them to the client
// the react-router do the route part
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(PORT, function() {
  console.log(`Frontend start on http://localhost:${PORT}`);
});
