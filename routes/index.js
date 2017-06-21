var express = require('express');
var router = express.Router();
var path = require("path");
var moment = require('moment');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req);
  res.render('index', { title: 'Express', Pavel: "Pavel" });
});
router.get('/pavel', function (req, res) {
  res.sendFile(path.join(__dirname + '/../views/pavel.html'));
});
router.get('/API/room_occupation/create', function (req, res) {           //endpoint #1 - create (should be post)
  const pg = require('pg');
  var myDbUrl = "postgres://ouxkbqmnxtrhrx:23ef9a216cc43c9a3d6735fcaa267c4460df821812b787d8d5eff1b8f3d083b3@ec2-54-225-236-102.compute-1.amazonaws.com:5432/d9nfd64qpil3d2";
  const connectionString = myDbUrl;
  pg.defaults.ssl = true;
  const client = new pg.Client(connectionString);
  client.connect();
  const query = client.query('INSERT into room_occupation (user_id, start_timestamp, end_timestamp, phone_number, description, is_colaberative) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', 
    [2,moment(),moment().add(2, "hours"),"0532830655","looking for a drummer",true], 
    function(err, result){
      if(err){
        console.log(err);
        res.json(err);
      }
      else{
        res.json(result);
      }
    }  
  );
  query.on('end', () => { client.end(); });
})
router.get('/API/room_occupation/all', function (req, res) {              //endpoint #2 - get
  const pg = require('pg');
  var myDbUrl = "postgres://ouxkbqmnxtrhrx:23ef9a216cc43c9a3d6735fcaa267c4460df821812b787d8d5eff1b8f3d083b3@ec2-54-225-236-102.compute-1.amazonaws.com:5432/d9nfd64qpil3d2";
  const connectionString = myDbUrl;
  pg.defaults.ssl = true;
  const client = new pg.Client(connectionString);
  client.connect();
  const query = client.query('select * from room_occupation where 1=1', 
    [], 
    function(err, result){
      if(err){
        console.log(err);
        res.json(err);
      }
      else{
        res.json(result.rows);
      }
    }  
  );
  query.on('end', () => { client.end(); });
})
module.exports = router;