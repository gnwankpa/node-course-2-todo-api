
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);

    }, (e) => {
        res
        .status(400)
        .send(e);

    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id' , (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('ID not valid');
        return res
        .status(404)
        .send();

    } Todo.findById(id).then((todo) => {
        if (!todo) {
            return res
            .status(404)
            .send();
            

        } console.log('Todo by ID:', todo);
        res
        .status(200)
        .send(todo);
        
        

    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    });

    //valid id using isValid
        //404 send back empty send

    // findById
        // success
            //if todo - send it back
            // if no todo - send back 404 with  empty body
    // error
        // 400 - and send empty body back 

});

app.listen(3000, () => {
    console.log('Started on port 3000');
});



module.exports = {app};
// var newTodo = new Todo({
//     text: 'Cook dinner'
// })

// var newTodo = new Todo({
//     text: 'Lozss  '
// });

// var newUser = new User({
//     email: 'ccnwankpa@gmail.com  '
// });


// // newTodo.save().then((doc) => {
// //     console.log(JSON.stringify(doc, undefined, 2));
// // }, (e) => {
// //     console.log('Unable to save todo', e);
// // });

// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to save user', e);
// });