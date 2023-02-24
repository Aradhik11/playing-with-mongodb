const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { Collection } = require('mongodb');
const dboper = require('./operation');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) =>{
    // assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dboper.insertDocument(db, {name: 'Aradhik', description: 'Frontend Developer'}, 'dishes')
    .then((result) => {
        console.log('Insert Document:\n', result.ops);

        return dboper.findDocumets(db, 'dishes')
    })
    .then((docs) => {
        console.log('Found Documents:\n', docs);

        return dboper.updateDocument(db, {name: 'Aradhik'}, {description: 'Backend Developer'}, 'dishes')
    })
    .then((result) => {
        console.log('Updated Document:\n', result.ops);

        return dboper.findDocumets(db, 'dishes')
    })
    .then((docs) => {
          
        console.log('Found Document:\n', docs);
        return db.dropCollection('dishes')
     })
    .then((result) => {
        console.log('Dropped collection:\n', result);
        client.close()
    }).catch((err) =>
        console.log(err));

                
}).catch((err) => console.log(err));





 // const collection = db.collection('dishes');

    // collection.insertMany([{"name": "Baytur-Rahmon", "description": "HUB"},{"name": "Safyarn", "description": "Complex"},{"name": "MumtazRoyale", "description": "Online"},{"name": "DArul-Khayr", "description": "Designer"}], (err,result) =>{
    //     assert.equal(err,null);

    //     console.log('After insert \n');
    //     console.log(result.ops);

    //     collection.find({}).toArray((err,docs) =>{
    //         assert.equal(err, null);

    //         console.log('Found: \n');
    //         console.log(docs);

    //         db.dropCollection('dishes', (err,result) => {
    //             assert.equal(err,null);

    //             client.close();
    //         });
    //     })
    // });