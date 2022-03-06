# Essay Log Book

The Essay Log Book is used to keep track of students, essays, and progress notes.

# URL
https://essay-log-book.herokuapp.com/

# Resources

## Student
**Attributes**
* First Name - string
* Last Name - string
* Birthday - date
* Date of Arrival - date

## Essays
**Attributes**
* Student - Student Object
* Size - int
* Reason - string
* From - string
* Completed - bool

## Progress Notes
**Attributes**
* Student - student sbject
* Date - date
* Notes - string
* From - string

 # Schema

 ## Student Schema
```
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
```

## Note Schema
```
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
```

## Essay Schema
```
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
```

# REST Endpoints
Name                           | Method | Path
----------------------------|--------|------------------
Retrieve student collection | GET    | /students
Retrieve essay collection   | GET    | /essays
Retrieve note collection    | GET    | /notes
Create student member       | POST   | /students
Create essay member         | POST   | /essays
Create note member          | POST   | /notes
Update essay member         | PUT    | /essays/*\<id\>*
Update note member          | PUT    | /notes/*\<id\>*
Delete student member       | DELETE | /students/*\<id\>*
Delete essay member         | DELETE | /essays/*\<id\>*

