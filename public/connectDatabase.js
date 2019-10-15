const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var http = require('http');


const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.engine('html', require('ejs').renderFile);


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nevergiveup12@",
  database: "tokimondatabase"
});

app.post('/createtokimon', (req, res) => {
  var Name = req.body.Name;
  var Height = parseInt(req.body.Height,10);
  var Weight = parseInt(req.body.Weight,10);
  var Fly = parseInt(req.body.Fly,10);
  var Fight = parseInt(req.body.Fight,10);
  var Fire = parseInt(req.body.Fire,10);
  var Water = parseInt(req.body.Water,10);
  var Electric = parseInt(req.body.Electric,10);
  var Ice = parseInt(req.body.Ice,10);
  var TrainerName = req.body.TrainerName; 
  var Total = Height + Weight + Fly + Fight + Fire + Water + Electric + Ice;

  var sql = "INSERT INTO tokimonarchive (TokimonName, Height, Weight, Fly, Fight, Fire, Water, Electric, Ice, Total, TrainerName) VALUES ('"+Name+"', "+Height+", "+Weight+", "+Fly+", "+Fight+", "+Fire+", "+Water+", "+Electric+", "+Ice+", "+Total+", '"+TrainerName+"')";
    con.query(sql, function (err, result) {
      if (err)
        throw err;
      console.log("1 tokimon inserted");
    });

  res.writeHead(200, {"Content-Type":"text/plain"});
  res.write(`Added Tokimon's information:
  ${req.body.Name}
  ${req.body.Height}
  ${req.body.Weight}
  ${req.body.Fly}
  ${req.body.Fight}
  ${req.body.Fire}
  ${req.body.Water}
  ${req.body.Electric}
  ${req.body.Ice}
  ${req.body.TrainerName}`);
  res.end();
});

app.post('/changetokimon', (req, res) => {
  var name = req.body.Name;
  var height = parseInt(req.body.Height,10);
  var weight = parseInt(req.body.Weight,10);
  var fly = parseInt(req.body.Fly,10);
  var fight = parseInt(req.body.Fight,10);
  var fire = parseInt(req.body.Fire,10);
  var water = parseInt(req.body.Water,10);
  var electric = parseInt(req.body.Electric,10);
  var ice = parseInt(req.body.Ice,10);
  var trainerName = req.body.TrainerName; 
  var total = height + weight + fly + fight + fire + water + electric + ice;


  var sql = "UPDATE tokimonarchive SET Height = "+height+", Weight = "+weight+", Fly = "+fly+", Fight= "+fight+", Fire = "+fire+", Water = "+water+", Ice = "+ice+", Total = "+total+", TrainerName = '"+trainerName+"' WHERE TokimonName = '"+name+"'";
    con.query(sql, function (err, result) {
      if (err) 
        throw err;
      console.log("1 tokimon changed");
    });
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write(`Edited Tokimon's information:
  ${req.body.Name}
  ${req.body.Height}
  ${req.body.Weight}
  ${req.body.Fly}
  ${req.body.Fight}
  ${req.body.Fire}
  ${req.body.Water}
  ${req.body.Electric}
  ${req.body.Ice}
  ${req.body.TrainerName}`);
    res.end();
});

app.get('/archive', (req, res) => {
  var sql = "SELECT * FROM tokimonarchive";
  con.query(sql, function (err, rows, field) {
    if (err) throw err;
    //var row = {'rows': result.rows}
    //res.render('pages/archive', row)
    //res.json(rows); 
    res.send(rows);
  });
});

app.post('/deletetokimon', (req, res) => {
  var Name = req.body.Name;


  var sql = "DELETE FROM tokimonarchive WHERE TokimonName = '"+Name+"'" ;
    con.query(sql, function (err, result) {
      if (err)
        throw err;
      console.log("All tokimons with selected name deleted");

    });
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write(`All tokimons with selected name deleted`);
});





const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});