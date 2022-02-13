const express = require('express')
const model = require('./model')
const Essay = model.Essay;
const Student = model.Student;
const Note = model.Note;

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false}))
app.use(express.json({}))

app.get('/essays', (req, res) => {
    app.set('Access-Control-Allow-Origin','*');
    Essay.find().then((essays) => {
        res.json(essays);
    });
})

app.get('/students', (req, res) => {
    res.set('Access-Control-Allow-Origin','*');
    Student.find().then((students) => {
        res.json(students);
    });
})

app.get('/progressnotes', (req, res) => {
    res.set('Access-Control-Allow-Origin','*');
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
    res.set('Access-Control-Allow-Origin', '*');
    res.status(201).send("Student Saved")
    }).catch(()=> {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(500).send("Server Error!")
    });
})



app.listen(port, () => {
    console.log(`Essay App listening at http://localhost:${port}`)
})