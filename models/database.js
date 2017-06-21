const pg = require('pg');
var myDbUrl = "postgres://ouxkbqmnxtrhrx:23ef9a216cc43c9a3d6735fcaa267c4460df821812b787d8d5eff1b8f3d083b3@ec2-54-225-236-102.compute-1.amazonaws.com:5432/d9nfd64qpil3d2";
const connectionString = myDbUrl;
pg.defaults.ssl = true;
const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });