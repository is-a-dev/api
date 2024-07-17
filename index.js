require("./instrument");
const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.port || 3000;

const Sentry = require("@sentry/node");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./util/router");

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use("/", router);

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
})
