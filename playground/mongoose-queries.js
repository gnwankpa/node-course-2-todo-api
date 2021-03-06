const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a6e3a3be8c421281a727d75'
// var id = '5a6f25334b334d9c0559728b';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
// Todo.find({
//     _id: id

// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id

// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo By ID', todo);
// }).catch((e) => console.log(e));

//User .findByID

User.findById(id).then((user) => {
    if (!user){
        return console.log('User not found');
    }
    console.log('User is found by ID:', user);
}).catch((e) => console.lof(e));
