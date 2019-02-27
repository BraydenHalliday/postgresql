
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
const command = process.argv[2];


client('famous_people').select()
.where('first_name', 'like', `%${command}%`)
.orWhere('last_name', 'like', `%${command}%`)
.then(function(res) {
   
    console.log('searching.....')
    console.log(`found ${res.length} person(s) by the name ${command}`);
    res.forEach(function(spot) {
        console.log(spot.first_name, spot.last_name, ', born', spot.birthdate );
    })
    client.destroy();
})


/*
client('famous_people').where({
    first_name: `${command}`
    
})
.asCallback(function(err, rows) {
    if (err) {
        return console.error("Connection Error", err);
}
    console.log(`found ${res.rows.length} person(s) by the name ${command}`);
    res.rows.forEach(function(spot) {

        console.log(spot.first_name, spot.last_name, ', born', spot.birthdate );
    })
    knex.destroy();
  });


if (command) {
    // TODO: Make sure the args are there!!
    listPeople(client, command);
  }
});*/

