const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5a6fd123e73072065469b76b'}).then((todo) => {
});

Todo.findByIdAndRemove('5a6fd123e73072065469b76b').then((todo) => {
    console.log(todo);

});