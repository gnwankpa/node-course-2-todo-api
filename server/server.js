
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');


const app = express();

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
        return res.status(404).send();

    } Todo.findById(id).then((todo) => {
        if (!todo) {
            //make sure you return to stop the program
            return res.status(404).send();
            

        }res
        .status(200)
        // see **** {todo}
        .send({todo});
        
        

    }).catch((e) => {
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        //Always use a send to send a respone and prevent a hang
        return res.status(404).send();
    } Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } res
        .status(200)
        .send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
    //get the id

    //validate the id -> not valid? return 404

    // Remove todo by id
        // success
            // if no doc, send 404
            // if doc send doc back with 200
        // error
            //400 with empty body
});

app.patch('/todos/:id' , (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    })
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

// see **** {todo}
    // In your server.js file, make sure your send the todo inside {}


    // res.status(200).send({todo});



    // I had it as 

    // res.status(200).send(todo);

    // which meant the object returned was a single object with the _id, text etc properties rather than a todo object that would then have the properties inside it i.e. it would return this:

    // { _id: '5a469ae74ebd81e4f064c78e',
    //      __v: 0,
    //      text: 'first test todo',
    //      completedAt: null,
    //      completed: false } 



    // rather than this:

    // { todo:
    //    { _id: '5a469ae74ebd81e4f064c78e',
    //      __v: 0,
    //      text: 'first test todo',
    //      completedAt: null,
    //      completed: false } }

    // Hope it helps!