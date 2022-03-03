const express = require('express')
const model = require('./model')
const cors = require('cors')
const Essay = model.Essay;
const Student = model.Student;
const Note = model.Note;

const app = express()
const port = process.env.PORT

app.use(express.static('public'));
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

app.put('/essays/:essayId', (req, res)=> {
    Essay.findOneAndUpdate({
        _id: req.params.essayId},
        {completed: req.body.completed
    }).then((essay) => {
        if(essay){
            res.sendStatus(202);
        } else {
            res.sendStatus(500);
        }
    })
})

app.put('/notes/:noteId', (req, res)=> {
    Note.findOneAndUpdate({
        _id: req.params.noteId},
        {prognote: req.body.prognote
    }).then((note) => {
        if(note){
            res.sendStatus(202);
        } else {
            res.sendStatus(500);
        }
    })
})

app.delete('/essays/:essayid', (req, res) => {
    console.log("delete essay: ", req.params.essayid);
    Essay.findOneAndDelete({
        _id: req.params.essayid
    }).then((essay) => {
        if (essay){
            res.sendStatus(204);
        } else {
            res.sendStatus(500);
        }
    }).catch(error => {
        console.error("delete essay failed.");
        res.sendstatus(404)
    })
})

app.delete('/students/:studentid', (req, res) => {
    console.log("delete student: ", req.params.studentid);
    Student.findOneAndDelete({
        _id: req.params.studentid
    }).then((student) => {
        if (student){
            res.sendStatus(204);
        } else {
            res.sendStatus(500);
        }
    }).catch(error => {
        console.error("delete student failed.");
        res.sendstatus(404)
    })
})

app.get('/students/:studentId', (req, res) => {
    console.log("the student ID: ", req.params.studentId);
    
    Student.findOne({
        _id: req.params.studentId
    }).then((student) => {
        if (student){
        app.set('Access-Control-Allow-Origin','*');
        res.json(student);
        } else {
            res.sendStatus(404);
        }
    }).catch(error => {
        console.error("DB query failed.");
        res.sendStatus(400);
    })
})

app.get('/essays', (req, res) => {
    Essay.find().then((essays) => {
        res.json(essays);
    });
})
/* FILERING
app.get('/essays', (req, res) => {
    Essay.find({fname: 'Max'}).then((essays) => {
        res.json(essays);
    });
})
/////////////////OR////////////////

app.get('/essays', (req, res) => {

    console.log("the request query parameters are: ", req.query)

    var query = {};
    if (req.query.name) {
        query.name = req.query.name;
    }

    Essay.find(query).sort('lname').then((essays) => {
        res.json(essays);
    });
})


*/
app.post('/essays', (req, res) =>{
    console.log("raw request body: ", req.body);
    var essay = new Essay({
        size: req.body.size,
        reason: req.body.reason,
        time: req.body.time,
        from: req.body.from,
        completed: false,
        student: req.body.student
    });
    essay.save().then(()=> {
        res.status(201).send("Essay Logged.")
    }).catch((error)=> {
        console.error("Error occured while creating an essay.", error)
        if(error.errors){
            errors = {};
            for (let e in error.errors){
                errorMessages[e] = error.errors[e].message;
            }
            res.status(422).json(errorMessages);
        } else {
            res.status(500).send("Server Error!")
        }
    });
})

app.get('/students', (req, res) => {
//    res.set('Access-Control-Allow-Origin','*');
    Student.find().then((students) => {
        res.json(students);
    });
})
/* EXTRA?
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
*/
app.get('/notes', (req, res) => {
//    res.set('Access-Control-Allow-Origin','*');
    Note.find().then((notes) => {
        res.json(notes);
    });
})

app.post('/notes', (req, res) => {
    console.log("Raw request body: ", req.body);
    var note = new Note({
        prognote: req.body.prognote,
        date: req.body.date,
        from: req.body.from,
        student: req.body.student
    });
    note.save().then(()=> {
//    res.set('Access-Control-Allow-Origin', '*');
    res.status(201).send("Note Saved")
    }).catch((error)=> {
        console.error("Error occured while creating a note: ", error);
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