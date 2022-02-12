//////////////////First username: staff Password: Liahona2022

//login using: mongo "mongodb+srv://logbookcluster.fkflk.mongodb.net/Students" --username staff

const mongoose = require ('mongoose')

mongoose.connect('INSERT URL')

const Student = mongoose.model('Student', {
	fname: String,
	lname: String,
	birthday: Date,
	doa: Date,
	points: Number,
	essays: Array, //Use Subdocument?
	notes: Array
});

const Essay = mongoose.model('Essay', {
	student: Object,
	size: Number,
	reason: String,
	Time: Date,
	From: String,
	completed: Boolean
});

const Note = mongoose.model('Note', {
	student: Object,
	prognote: String,
	date: Date,
	quote: Boolean,
	visit: Boolean
});

module.exports = {
	Student: Student,
	Essay: Essay,
	Note: Note
};
