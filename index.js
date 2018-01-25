const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const controller = require('./controller');
require('dotenv').config();

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

// how to access things from your .env file.
//massive(process.CONNECTION_STRING)
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);

    // ran this once to insert planes into table. then commented out to 
    // dbInstance.new_planes()
    //     .then( planes => console.log(planes))
    //     .catch( err => console.log(err));

    // this is saying run get_planes.sql in dbInstance then log planes// changed to use controller
    // dbInstance.get_planes()
    //     .then(planes => console.log(planes))
    //     .catch(err => console.log(err));


    // this is the save as above just condensed into a controller
    // postman get : http://localhost:3000/api/planes
    app.get('/api/planes', controller.getPlanes);

});

const port = process.env.PORT || 3000
app.listen( port , () => { console.log(`Server listening on port ${port}`); } );

