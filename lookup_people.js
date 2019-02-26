
const pg = require('pg');
const settings = require('./settings.json')
const client = new pg.Client(settings);

const command = process.argv[2];

function listPeople(db, name) {
  db.query(`SELECT * FROM famous_people WHERE first_name LIKE '%${name}' OR last_name LIKE '%${name}';`, (err, res) => {
    if (err) {
        return console.error("Connection Error", err);
}
    console.log(`found ${res.rows.length} person(s) by the name '${command}'`, res.rows);
    db.end();
  });
}


client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
}
  console.log('searching...');
  if (command) {
    // TODO: Make sure the args are there!!
    listPeople(client, command);
  }
});