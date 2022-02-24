const express = require('express')
const model = require('./model')
const cors = require('cors')
const Essay = model.Essay;
const Student = model.Student;
const Note = model.Note;

const app = express()
const port = 3000

app.use(cors());
/*
app.get('/essays/:essayId', (req, res) => {
    console.log("the Essay ID: ", req.params.essayId);
    
    Essay.findOne({
        _id: req.params.essayId
    }).then((essay) => {
        if (essay){
        app.set('Access-Control-Allow-Origin','*');
        res.json(essay);
        } else {
            res.sendStatus(404);
        }
    }).catch(error => {
        console.error("DB query failed.");
        res.sendStatus(400);
    });
})
//for DELETE use error code 500 pair find and delete use "find" for delete.
*/
// use err 422 for validation fail.
/*
    CCORS
    Delete all Access-Control-Allow-Origin
    npm install cors

*/



app.use(express.urlencoded({ extended: false}))
app.use(express.json({}))

app.get('/essays', (req, res) => {
//    app.set('Access-Control-Allow-Origin','*');
    Essay.find().then((essays) => {
        res.json(essays);
    });
})

app.get('/students', (req, res) => {
//    res.set('Access-Control-Allow-Origin','*');
    Student.find().then((students) => {
        res.json(students);
    });
})

app.get('/students/:studentId', (req, res) => {
    console.log("StudentID: ", req.params.studentId);
    Student.findOne({
        _id: req.params.studentId
    }).then((student) => {
        if (student){
            res.json(student);
        } else {
            res.sendStatus(404);
        }
    }).catch(error => {
        console.error("DB query failed.");
        res.sendStatus(400);
    });
})

app.get('/progressnotes', (req, res) => {
//    res.set('Access-Control-Allow-Origin','*');
    Note.find().then((notes) => {
        res.json(notes);
    });
})

app.post('/students', (req, res) => {
    console.log("Raw request body: ", req.body);
    var student = new Student({
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        doa: req.body.doa,
        points: 0,
        essays: [],
        notes: []
    });
    student.save().then(()=> {
//    res.set('Access-Control-Allow-Origin', '*');
    res.status(201).send("Student Saved")
    }).catch((error)=> {
        console.error("Error occured while creating a student: ", error);
        if (error.errors){
            errors = {};
            for (let e in error.errors) {
                errorMessages[e] = error.errors[e].message;
            }
            res.status(422).json(errorMessages);
        } else {
            res.status(500).send("Server Error!")
        }
    });
})



app.listen(port, () => {
    console.log(`Essay App listening at http://localhost:${port}`)
})