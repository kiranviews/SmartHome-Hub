// The main.js file of your application
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.html");
  });
  app.get("/about", function (req, res) {
    res.render("about.html");
  });

  app.get("/adddevice", function (req, res) {
    res.render("adddevice.html");
  });

  app.post("/added", function (req, res) {
    // saving data in database
    let sqlquery =
      "INSERT INTO devices (name, type, power, state, temp, volume) VALUES (?,?,?,?,?,?)";
    // execute sql query
    let newrecord = [
      req.body.name,
      req.body.type,
      req.body.power,
      req.body.state,
      req.body.temp,
      req.body.volume,
    ];
    db.query(sqlquery, newrecord, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.render("deviceadded.html");
      }
    });
  });

  app.get("/list", function (req, res) {
    // query database to get all the books
    let sqlquery = "SELECT * FROM devices";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("list.html", { availabledevices: result });
    });
  });

  app.get("/devicesearch", function (req, res) {
    // query database to get all the books
    let sqlquery = "SELECT * FROM devices";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("devicesearch.html", { availabledevices: result });
    });
  });

  app.get("/devicesearch-result-db", function (req, res) {
    //searching in the database
    //let word = [req.query.name];
    let word = [req.query.name.split(",").join(" ")];
    //let sqlquery = "SELECT * FROM devices WHERE name like ?";
    let sqlquery = "SELECT * FROM `devices` WHERE name like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        return console.error(
          "No device found with the keyword you have entered" +
            req.query.name +
            "error: " +
            err.message
        );
        //res.redirect("./search"); this can also be used in case of an error instead of the above line
      } else {
        res.render("showstatus.html", { availabledevices: result });
      }
    });
  });

  app.get("/deletedevice", function (req, res) {
    // query database to get all the books
    let sqlquery = "SELECT * FROM devices";
    // execute sql query
    db.query(sqlquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("deletedevice.html", { availabledevices: result });
    });
  });

  app.get("/deletedevice-result-db", function (req, res) {
    //searching in the database
    let word = [req.query.name.split(",").join(" ")];
    let sqlquery = "DELETE FROM `devices` WHERE name like ?";
    // execute sql query
    db.query(sqlquery, word, (err, result) => {
      if (err) {
        return console.error(err.message);
      } else {
        res.render("deletestatus.html", { availabledevices: req.query.name });
      }
    });
  });
};
