const express = require("express");
require('dotenv').config();
const { prettyPrintJson } = require("pretty-print-json");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000



app.use(cors());
app.set("view engine", "pug");
app.use(express.static("public"));


let reports = [];

console.log("Starting server");

app.get("/", (request, response) => {
  console.log("user pinged")
  response.send("hello");
});

app.get("/", (request, response) => {
  response.send("hello");
});

app.get("/reports", (request, response) => {
  response.send(reports);
});


// handle incoming reports
app.post("/violation", async (request, response) => {
  handleReportRequest(request, response);
});



function handleReportRequest(request, response) {
  console.log("Report received");
  if (request.get("Content-Type") === "application/csp-report") {
  // handle Reporting API reports, which are sent in an array of reports
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const report = JSON.parse(data);
    console.log(report);

  });
  response.status(200).send("OK");
  } else
    response
      .status(400)
      .send(
        new Error(
          "Content-Type not supported. The Content-Type must be application/csp-report."
        )
      );
}

app.listen(PORT, () => {
  console.log(`CSP Reporter app listening at ${PORT}`)
})