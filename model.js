
const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt');
const { Schema } = mongoose;
mongoose.connect('mongodb+srv://staff:Liahona2022@logbookcluster.fkflk.mongodb.net/Students?retryWrites=true&w=majority');
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
	strdatebday: {
		type: String,
	},
	strdatedoa: {
		type: String,
	},
//	essays: [{ type: Schema.Types.ObjectId, ref: 'Essay'}],
//	notes: [{ type: Schema.Types.ObjectId, ref: 'Note'}],
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
	strdate: {
		type: String,
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
	strdate: {
		type: String,
	},
	student: { type: Schema.Types.ObjectId, ref: 'Student'},
});
const Note = mongoose.model('Note', noteSchema);

const userSchema = new mongoose.Schema({
	userFname: {
		type: String,
		required: [true, "First name is required."]
	},
	userLname: {
		type: String,
		required: [true, "Last name is required."]
	},
	email: {
		type: String,
		required: [true, "email is required."],
        unique: true
	},
	encryptedPassword: {
		type: String,
		required: [true, "password is required."]
	}
})

userSchema.methods.setEncryptedPassword = function (myPlainTextPassword) {
	let promise = new Promise((resolve, reject) => {
		bcrypt.hash(myPlainTextPassword, 12).then(hash => {
			this.encryptedPassword = hash;
			resolve();
		});
	});
	return promise;
}

userSchema.methods.verifyPassword = function (plainPassword) {
    let promise = new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, this.encryptedPassword).then(result => {
            resolve(result);
        });
    });
    return promise;
}

const User = mongoose.model('User', userSchema);


module.exports = {
	Student: Student,
	Essay: Essay,
	Note: Note,
	User: User
};




////////////////////////////////NOTES//////////////////////////////////
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
