
const knex = require('knex')
console.log(typeof knex);
const settings = require('./settings.json')
const client = knex({
    client: 'pg',
    connection: {
      user: "development",
      password: "development",
      database: "test_db",
      host: "127.0.0.1",
    }
});

const command1 = process.argv[2];
const command2 = process.argv[3];
const command3 = process.argv[4];

function createPerson(db, firstName, lastName, birthdt) {

    // For SQL Injection, the following value needs to be passed in to lastName (for example)
    // lastName = `
    //   ''); DROP TABLE people; --
    // `
    // The first query is an example of SQL Injection happens:
    // User input is unsafe and needs to be sanitized by escaping any single quotes
    // const query = `INSERT INTO
    //                 "people" (first_name, last_name)
    //                 VALUES ('${firstName}', '${lastName}');
    //               `
    // The approach shown below lets the pg library sanitize the inputs so that we don't have to do it manually
    /*const query = `INSERT INTO
                    "famous_people" (first_name, last_name, birthdate)
                    VALUES ($1::text, $2::text, $3::text);
                  `
    console.log('insert person: ', query);
    db.query(query, [firstName, lastName, birthdt], (err, res) => {
        if (err) {
            return console.error("Error in querry", err);
        }
      console.log('createPerson res:', res);
    });*/

   client('famous_people').insert({
      first_name: firstName,
      last_name: lastName,
      birthdate: birthdt
    }).asCallback(function(err, rows) {
      if (err) {
        return console.error("Error in querry", err);
    }
    console.log(rows)
    knex.destroy()
  })

}

createPerson(client, command1, command2, command3)


//   var knex = require('knex')({
//     client: 'pg',
//     connection: {...},
//     pool: {
//       afterCreate: function (conn, done) {
//         // in this example we use pg driver's connection API
//         conn.query('SET timezone="UTC";', function (err) {
//           if (err) {
//             // first query failed, return error and don't try to make next query
//             done(err, conn);
//           } else {
//             // do the second query...
//             conn.query('SELECT set_limit(0.01);', function (err) {
//               // if err is not falsy, connection is discarded from pool
//               // if connection aquire was triggered by a query the error is passed to query promise
//               done(err, conn);
//             });
//           }
//         });
//       }
//     }
//   });







// client.connect((err) => {
//     if (err) {
//         return console.error("Connection Error", err);
// }
//   console.log('searching...');
//   if (command1 && command2 && command3) {
//     // TODO: Make sure the args are there!!
//     listPeople(client, command1, command2, command3);
//   }
// });