//////////////////First username: staff Password: Liahona2022

//login using: mongo "mongodb+srv://logbookcluster.fkflk.mongodb.net/Students" --username staff

const mongoose = require ('mongoose')
const { Schema } = mongoose;
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
	},
	essays: [{ type: Schema.Types.ObjectId, ref: 'Essay'}],
	notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
	points: Number,
});

const Student = mongoose.model('Student', studentSchema);


const essaySchema = new mongoose.Schema({
	size: {
		type: Number,
		required: [true, "Essay size is required."]
	},
	reason: {
		type: String,
		required: [true, "Essay reason is required."]
	},
	time: {
		type: Date,
		required: [true, "Essay date is required."]
	},
	from: {
		type: String,
		required: [true, "Essay from is required."]
	},
	completed: Boolean,

	student: { type: Schema.Types.ObjectId, ref: 'Student'},
});

const Essay = mongoose.model('Essay', essaySchema);

const noteSchema = new mongoose.Schema({
	prognote: {
		type: String,
		required: [true, "Progress note is required."]
	},
	date: {
		type: Date,
		required: [true, "Note date is required."]
	},
	from: {
		type: String,
		required: [true, "Prognote from is required."]
	},
	student: { type: Schema.Types.ObjectId, ref: 'Student'},
});
const Note = mongoose.model('Note', noteSchema);

module.exports = {
	Student: Student,
	Essay: Essay,
	Note: Note
};

/*
const Note = mongoose.model('Note', {
	student: Object,
	prognote: String,
	date: Date,
	quote: Boolean,
	visit: Boolean
});
*/
/*
const Student = mongoose.model('Student', {
	fname: String,
	lname: String,
	birthday: Date,
	doa: Date,
	points: Number,
	essays: Array, //Use Subdocument?
	notes: Array
});
*/