//////////////////First username: staff Password: Liahona2022

//login using: mongo "mongodb+srv://logbookcluster.fkflk.mongodb.net/Students" --username staff

const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://staff:Liahona2022@logbookcluster.fkflk.mongodb.net/Students?retryWrites=true&w=majority');

/*
const schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "name is required."]
	},
	species: {
		type: String,
		required: [true, "species is required."]
	}
});

const ASDF = mongoose.model('asdf', schema);
*/

const studentSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: [true, "First name is required."]
	},
	lname: {
		type: String,
		required: [true, "Last name is required."]
	},
	birthday: {
		type: Date,
		required: [true, "Birthday is required."]
	},
	doa: {
		type: Date,
		required: [true, "Date of Arrival is required."]
	}
});

const Student = mongoose.model('Student', studentSchema);


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
