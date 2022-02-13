//////////////////First username: staff Password: Liahona2022

//login using: mongo "mongodb+srv://logbookcluster.fkflk.mongodb.net/Students" --username staff

const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://staff:Liahona2022@logbookcluster.fkflk.mongodb.net/Students?retryWrites=true&w=majority');

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
	time: Date,
	from: String,
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
