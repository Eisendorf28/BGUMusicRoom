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
router.post('/API/room_occupation/create', function (req, res) {           //endpoint #1 - create (should be post)
  const pg = require('pg');
  var myDbUrl = "postgres://ouxkbqmnxtrhrx:23ef9a216cc43c9a3d6735fcaa267c4460df821812b787d8d5eff1b8f3d083b3@ec2-54-225-236-102.compute-1.amazonaws.com:5432/d9nfd64qpil3d2";
  const connectionString = myDbUrl;
  pg.defaults.ssl = true;
  const client = new pg.Client(connectionString);
  client.connect();
  console.log(req.body);
  console.log(moment.unix(req.body.start_timestamp));
  console.log(moment.unix(req.body.end_timestamp));
  const query = client.query('INSERT into room_occupation (user_id, start_timestamp, end_timestamp, phone_number, description, is_colaberative) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [req.body.user_id, moment.unix(req.body.start_timestamp), moment.unix(req.body.end_timestamp), req.body.phone_number, req.body.description, req.body.is_colaberative],
    function (err, result) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      else {
        res.json(result.rows);
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
    function (err, result) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      else {
        res.json(result.rows);
      }
    }
  );
  query.on('end', () => { client.end(); });
})
router.delete('/API/room_occupation/delete/:id', (req, res, next) => {         //endpoint #3 - delete
  const results = [];
  const pg = require('pg');
  var myDbUrl = "postgres://ouxkbqmnxtrhrx:23ef9a216cc43c9a3d6735fcaa267c4460df821812b787d8d5eff1b8f3d083b3@ec2-54-225-236-102.compute-1.amazonaws.com:5432/d9nfd64qpil3d2";
  const connectionString = myDbUrl;
  const client = new pg.Client(connectionString);
  client.connect();
  pg.defaults.ssl = true;
  // Grab data from the URL parameters
  const id = req.params.id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM room_occupation WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM room_occupation ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
module.exports = router;