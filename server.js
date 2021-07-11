const express = require("express");
//require mongoose in order to connect to the database
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

//express Middleware
app.use(express.json()); //new way of using body-parser

//Database config
//put the file that has access to the mongo uri in a single variable
const db = config.get("mongoURI");

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static asserts if in production
//if (process.env.NODE_EVN === "production") {
  //Set static folder
  //app.use(express.static("client/build"));

  //app.get("*", (req, res) => {
    //res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  //});
//}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));