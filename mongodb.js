//CRUD - Create, read, update and delete

const { MongoClient, ObjectId } = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// MongoClient.connect(connectionURL, { }, (error, client) => {
   
   
// });


async function operation(){

    try{

          const client = await MongoClient.connect(connectionURL);

    const db = client.db(databaseName);

//   const result = await  db.collection('tasks').insertMany([{
//         description: 'Fetch water',
//         completed: true
//     },{
//         description: 'Eat food',
//         completed: false
//     },{
//         description: 'Go Shopping',
//         completed: false
//     }

// ]);

// console.log(result);

// const user = await db.collection('users').findOne({_id: new ObjectId("6831709029c64f8fe6fa1e41")});

//count documents
// const users = await db.collection('users').countDocuments({age: 25});

//find multiple documents
// const users = await db.collection('users').find({age: 25}).toArray();

//update one document
// const updateDocument = await db.collection('users').updateOne({_id: new ObjectId("683179b27c9232276f2f11b2")}, { $set: {name: 'Julia'}});

//update many documents
// const updateDocument = await db.collection('tasks').updateMany({},{ $set: {completed: true}});
// console.log(updateDocument);


//delete one document

const deleteDoc = await db.collection('tasks').deleteOne({description: "Eat food"});

console.log(deleteDoc)

// const tasks = await db.collection('tasks').findOne({_id: new ObjectId('68317d13bcc6ef467ffa7ce6')});

// const tasks = await db.collection('tasks').find({completed: false}).toArray();

// console.log(tasks);




    }catch(e){

        return console.log(e);
    }

  

}

operation();


