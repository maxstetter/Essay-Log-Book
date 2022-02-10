# Essay Log Book

The Essay Log Book is used to keep track of a student's daily progress and their essay count.

# Resources

## Student
**Attributes**
* First Name - string
* Last Name - string
* Birthday - int?
* Date of Arrival - int?
* Points - int
* Essays - Essay Object
* Progress Notes - Progress Object

## Essays
**Attributes**
* Student - Student Object
* Size - int
* Reason - string
* Time - int?
* From - string
* Completed - bool

## Progress Notes
**Attributes**
* Student - Student Object
* Date - int?
* Notes - string
* Quote - bool
* Visit - bool
