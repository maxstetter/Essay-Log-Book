const express = require('express')
const model = require('./model')
const cors = require('cors');
const { useSSRContext } = require('vue');
const passport = require('passport')
const session = require('express-session')
const passportLocal = require('passport-local')
const Essay = model.Essay;
const Student = model.Student;
const Note = model.Note;
const User = model.User;

const app = express()
//change to switch from local to web app.
//const port = process.env.PORT
const port = 3000

app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: false}))
app.use(express.json({}))

//Passport stuff
app.use(session({ secret: 'asdf1qaz2wsxhigrug9', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy({
   usernameField: 'email',
   passwordField: 'password' 
    }, function (email, plainPassword, done) {
      //Authentication logic goes here
      //call done when you have an answer from your own function.
      
      //1 - check if the user exists in the DB by email.
      User.findOne({
          email: email
      }).then(function (user) {
            if (user) {
                //2 - if it does, verify the password using bcrypt
                user.verifyPassword(plainPassword).then(function (result) {
                    if (result) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                });
          } else { 
              done(null, false);
          }
      }).catch(function (err) {
          console.error(err);
            //handle error here.  
            done(err);
      });
      //3 - respond accordingly via the done() function.
    }));

passport.serializeUser( function (user, done) {
    done(null, user._id);
});

passport.deserializeUser( function (userId, done) {
    User.findOne({ _id: userId }).then( function (user) {
        done(null, user);
    }).catch(function (err) {
        done(err);
    });
});

app.post('/session', passport.authenticate('local'), function (req, res) {
    console.log("authentication succeeded.")
    res.sendStatus(201);
});

app.get('/session', function (req, res) {
    if (req.user) {
        console.log(req.user.userFname + " " +req.user.userLname, "logged in.");
        res.json(req.user);
    } else {
        res.sendStatus(401);
    }
});

//Crud operations
app.put('/essays/:essayId', (req, res)=> {
    Essay.findOneAndUpdate({
        _id: req.params.essayId},
        {completed: req.body.completed
    }).then((essay) => {
        if(essay){
            res.sendStatus(204);
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
            res.sendStatus(204);
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


app.post('/essays', (req, res) =>{
    console.log("raw request body: ", req.body);
    rawdate = new Date(req.body.time);
    let month = rawdate.getMonth() + 1;
    let day = rawdate.getDate();
    let year = rawdate.getFullYear();
    formatdate = month + '/' + day + '/' + year;
    var essay = new Essay({
        size: req.body.size,
        reason: req.body.reason,
        time: req.body.time,
        from: req.body.from,
        completed: false,
        student: req.body.student,
        strdate: formatdate
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

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.json(users);
    })
})

app.get('/students', (req, res) => {
    Student.find().then((students) => {
        res.json(students);
    });
})

app.get('/notes', (req, res) => {
    Note.find().then((notes) => {
        res.json(notes);
    });
})

app.get('/essays', (req, res) => {
    Essay.find().then((essays) => {
        res.json(essays);
    });
})

app.post('/notes', (req, res) => {
    console.log("Raw request body: ", req.body);
    rawdate = new Date(req.body.date);
    let month = rawdate.getMonth() + 1;
    let day = rawdate.getDate();
    let year = rawdate.getFullYear();
    formatdate = month + '/' + day + '/' + year;
    var note = new Note({
        prognote: req.body.prognote,
        date: req.body.date,
        from: req.body.from,
        student: req.body.student,
        strdate: formatdate
    });
    note.save().then(()=> {
    res.status(201).send("Note Saved")
    }).catch((error)=> {
        console.error("Error occured while creating a note: ", error);
        if (error.errors){
            var errorMessages = {};
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
    rawdatebday = new Date(req.body.birthday);
    let monthbday = rawdatebday.getMonth() + 1;
    let daybday = rawdatebday.getDate();
    let yearbday = rawdatebday.getFullYear();
    formatdatebday = monthbday + '/' + daybday + '/' + yearbday;
    rawdatedoa = new Date(req.body.doa);
    let month = rawdatedoa.getMonth() + 1;
    let day = rawdatedoa.getDate();
    let year = rawdatedoa.getFullYear();
    formatdatedoa = month + '/' + day + '/' + year;
    var student = new Student({
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        doa: req.body.doa,
        points: 0,
        essays: [],
        notes: [],
        strdatebday: formatdatebday,
        strdatedoa: formatdatedoa
    });
    student.save().then(()=> {
    res.status(201).send("Student Saved")
    }).catch((error)=> {
        console.error("Error occured while creating a student: ", error);
        if (error.errors){
            var errorMessages = {};
            for (let e in error.errors) {
                errorMessages[e] = error.errors[e].message;
            }
            res.status(422).json(errorMessages);
        } else {
            res.status(500).send("Server Error!")
        }
    });
})

app.post('/users', (req, res) =>{
    console.log("raw request body: ", req.body);
    var user = new User({
        userFname: req.body.userFname,
        userLname: req.body.userLname,
        email: req.body.email
    });
    //Method on the user.
    //TODO: fix server crash when processing a blank password.
    console.log("raw password request.", req.body.password);
    user.setEncryptedPassword(req.body.password).then(function () {
        //promise has now been fulfilled. 
        user.save().then(()=> {
            res.status(201).send("User created.")
        }).catch((error)=> {
            console.error("Error occured while creating a user.", error)
            if(error.errors){
                var errorMessages = {};
                for (let e in error.errors){
                    errorMessages[e] = error.errors[e].message;
                }
                res.status(422).json(errorMessages);
            } else {
                res.status(500).send("Server Error!")
            }
        });
    });
})

app.listen(port, () => {
    console.log(`Essay App listening at http://localhost:${port}`)
})







////////////////////////////NOTES/////////////////////////////////

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
