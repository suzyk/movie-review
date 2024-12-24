
import app from './server.js';
//import mongodb from 'mongodb';
const mongodb = require('mongodb');
import ReviewsDAO from './dao/reviewsDAO.js'; // DAO: Data Access Object

 // process of connecting to database
const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME']; //.MONGO_USERNAME;
const mongo_password = process.env['MONGO_PASSWORD'];
const uri =  `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.u9g0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//  Connect - Driver :
const port = 8000;
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500 /*, //ms
        useNewUrlParser: true*/
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1); 
})
.then(async client => {
    await ReviewsDAO.injectDB(client); // send our DB connects to reviewsDAO
    app.listen(port, () => {// () means we are not sending any function
        console.log(`listening on port ${port }`);
    }); 
})