// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//   db.collection('Todos').findOneAndUpdate({
//       _id: new ObjectID('5a6d65dce73072065469b769')
//   }, {
//       $set: {
//           complete: false
//       }
//   }, {
//       returnNewDocument: false
//   }).then((result) => {
//       console.log(result);
//   })
db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a6cdfef6b184c2a009800eb')
}, {
    $set: {
        name: 'Gene2'
    }, 
    $inc: {
        age: 1
    }
 }, {
    returnNewDocument: false
}).then((result) => {
    console.log(result);
})


// db.collection('Users').findOneAndUpdate({
//     _id: new ObjectID('5a6cdfef6b184c2a009800eb')
// }, {
//     $inc: {
//         age: 1
//     }
// }, {
//     returnNewDocument: false
// }).then((result) => {
//     console.log(result);
// })



//   db.close();


});
