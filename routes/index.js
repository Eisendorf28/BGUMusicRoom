var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.render('index', { title: 'Express', Pavel:"Daniel" });
});
router.get('/pavel', function(req,res){
  res.sendFile(path.join(__dirname+'/../views/pavel.html'));
});
module.exports = router;
