
//Comment the line below for local mode.
//const { includeBooleanAttr } = require("@vue/shared");

//const address = "https://essay-log-book.herokuapp.com/students/"
const address = "http://localhost:3000/"


var app = new Vue({
	el: '#app',
	data: {
		Essays: [],
		Students: [],
		Notes: [],
		Users: [],
		selectStudent: null,
		inputFname: "" ,
		inputLname: "",
		inputBirthday: "",
		inputDoa: "",
		inputEdate: "",
		inputFrom: "",
		inputReason: "",
		inputSize: "",
		inputNfrom: "",
		inputNdate: "",
		inputNote: "",
		page: "student",
		divStudent: true,
		divEssay: false,
		divNote: false,
        userFname: "",
        userLname: "",
        email: "",
		password: ""
	},
	methods: {
		clickMe: function() {
		},
		switchEssay: function(){
			this.page = "essay"
			
			this.fetchEssaysFromServer();
		},
		switchStudent: function(){
			this.page = "student"

			this.fetchStudentsFromServer();
		},
		switchNote: function(){
			this.page = "note"

			this.fetchNotesFromServer();
		},

		deleteStudent: function (student) {
			console.log("student._id: ", student._id);
			//fetch("https://essay-log-book.herokuapp.com/students/"+student._id, { method: "DELETE"	
			fetch(address + "students/"+student._id, { method: "DELETE"	
			}).then(response => {
				if (response.status == 204){
					this.fetchStudentsFromServer();
				} else {
					console.error("error deleting student: ", student);
				}
			});
		},

		deleteEssay: function (essay) {
			console.log("essay._id: ", essay._id);
			//fetch("https://essay-log-book.herokuapp.com/essays/"+essay._id, { method: "DELETE"	
			fetch(address+"essays/"+essay._id, { method: "DELETE"	
			}).then(response => {
				if (response.status == 204){
					this.fetchEssaysFromServer();
				} else {
					console.error("error deleting essay: ", essay);
				}
			});
		},
		
		retreiveStudent: function (student) {
			//fetch("https://essay-log-book.herokuapp.com/students/"+student._id, { method: "GET"
			fetch(address+"students/"+student._id, { method: "GET"
			}).then(response => {
				if (response.status == 204){
					this.fetchStudentsFromServer();
				} else {
					console.error("Error retrieving student: ", student);
				}
			})
		},
		
		validatefName: function (){
			if (this.inputFname.length == 0){
				alert("Please enter a first name.")
				return false;
			}
			return true;
		},
		validatelName: function (){
			if (this.inputLname.length == 0){
				alert("Please enter a last name.")
				return false;
			}
			return true;
		},
		validateBirthday: function (){
			if (this.inputBirthday.length == 0){
				alert("Please enter a birthday.")
				return false;
			}
			return true;
		},
		validateDoa: function (){
			if (this.inputDoa.length == 0){
				alert("Please enter a date of arrival.")
				return false;
			}
			return true;
		},
		createStudent: function () {
			
			if (!this.validatefName()){
				return;
			}
			if (!this.validatelName()){
				return;
			}
			
			var data = "fname=" +encodeURIComponent(this.inputFname);
			data += "&lname=" +encodeURIComponent(this.inputLname);
			data += "&birthday=" +encodeURIComponent(this.inputBirthday);
			data += "&doa=" +encodeURIComponent(this.inputDoa);
			//fetch("https://essay-log-book.herokuapp.com/students", {
			fetch(address+"students", {
				method: "POST",
				body: data,
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
				 }).then((response) => {
					 this.fetchStudentsFromServer();
				 });
				 
			this.inputFname = ""
			this.inputLname = ""
			this.inputBirthday = ""
			this.inputDoa = ""
		},

		validateSize: function (){
			if (this.inputSize.length == 0){
				return false;
			}
			return true;
		},
		validateDate: function (){
			if (this.inputEdate.length == 0){
				return false;
			}
			return true;
		},
		validateReason: function (){
			if (this.inputReason.length == 0){
				return false;
			}
			return true;
		},
		validateFrom: function (){
			if (this.inputFrom.length == 0){
				return false;
			}
			return true;
		},

		createEssay: function () {
		
			if (!this.validateSize()){
				alert("Invalid Size.")
				return;
			}
			if (!this.validateDate()){
				alert("Invalid Date.")
				return;
			}
			if (!this.validateReason()){
				alert("Invalid Reason.")
				return;
			}
			if (!this.validateFrom()){
				alert("Invalid From.")
				return;
			}

			var data = "size=" +encodeURIComponent(this.inputSize);
			data += "&reason=" +encodeURIComponent(this.inputReason);
			data += "&time=" +encodeURIComponent(this.inputEdate);
			data += "&from=" +encodeURIComponent(this.inputFrom);
			data += "&student=" + encodeURIComponent(this.selectStudent);
			//fetch("https://essay-log-book.herokuapp.com/essays", {
			fetch(address+"essays", {
				method: "POST",
				body: data,
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
				 }).then((response) => {
					 this.fetchEssaysFromServer();
				 });
				 
			this.inputReason = ""
			this.inputSize = ""
			this.inputEdate = ""
			this.inputFrom = ""
		},

		markEssay: function(essay){
			var data = "completed=" +essay.completed;
			//fetch("https://essay-log-book.herokuapp.com/essays/"+essay._id, { method: "PUT", body: data, headers: {"Content-Type": "application/x-www-form-urlencoded"}
			fetch(address+"essays/"+essay._id, { method: "PUT", body: data, headers: {"Content-Type": "application/x-www-form-urlencoded"}
			}).then(response => {
				if(response.status == 204){
					this.fetchEssaysFromServer();
				} else {
					console.error("Error marking essay.", essay);
				}
			})
		},

		editNote: function(note){
			var data = "prognote=" +note.prognote;
			//fetch("https://essay-log-book.herokuapp.com/notes/"+note._id, { 
			fetch(address+"notes/"+note._id, { 
				method: "PUT",
				body: data,
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
			}).then(response => {
				if(response.status == 204){
					this.fetchNotesFromServer();
				} else {
					console.error("Error editing note.", note);
				}
			})
		},
		
		validateNote: function (){
			if (this.inputNote.length == 0){
				return false;
			}
			return true;
		},
		validateNDate: function (){
			if (this.inputNdate.length == 0){
				return false;
			}
			return true;
		},
		validateNFrom: function (){
			if (this.inputNfrom.length == 0){
				return false;
			}
			return true;
		},
		
		createNote: function(){
			
			if (!this.validateNote()){
				alert("Cannot have an empty note.")
				return;
			}
			if (!this.validateNDate()){
				alert("Invalid Date.")
				return;
			}
			if (!this.validateNFrom()){
				alert("Invalid From.")
				return;
			}
			
			var data = "prognote=" +encodeURIComponent(this.inputNote);
			data += "&date=" +encodeURIComponent(this.inputNdate);
			data += "&from=" +encodeURIComponent(this.inputNfrom);
			data += "&student=" +encodeURIComponent(this.selectStudent);
			
			//fetch("https://essay-log-book.herokuapp.com/notes", {
			fetch(address+"notes", {
				method: "POST",
				body: data,
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
				 }).then((response) => {
					 this.fetchNotesFromServer();
				 });
				 
			this.inputNote = ""
			this.inputNdate = ""
			this.inputNfrom = ""
		},
		
		validateuserFname: function (){
			if (this.userFname.length == 0){
				return false;
			}
			return true;
		},
		validateuserLname: function (){
			if (this.userLname.length == 0){
				return false;
			}
			return true;
		},
		validateemail: function (){
			if (this.email.length == 0){
				return false;
			}
			return true;
		},
		validatepassword: function (){
			if (this.password.length == 0){
				return false;
			}
			return true;
		},
		
		
		createUser: function () {	
			if (!this.validateuserFname()){
				alert("Empty first name.")
				return;
			}
			if (!this.validateuserLname()){
				alert("Empty last name.")
				return;
			}
			if (!this.validateemail()){
				alert("Empty email.")
				return;
			}
			if (!this.validatepassword()){
				alert("Empty password.")
				return;
			}
			var data = "userFname=" +encodeURIComponent(this.userFname);
			data += "&userLname=" +encodeURIComponent(this.userLname);
			data += "&email=" +encodeURIComponent(this.email);
			data += "&password=" +encodeURIComponent(this.password);
			//fetch("https://essay-log-book.herokuapp.com/users", {
			fetch(address+"users", {
				method: "POST",
				body: data,
				headers: {"Content-Type": "application/x-www-form-urlencoded"},
				credentials: "include"
				 }).then((response) => {
					 this.fetchUsersFromServer();
				 });
				 
			this.userFname = ""
			this.userLname = ""
			this.email = ""
			this.password = ""
			console.log("User Created.")
		},

		fetchNotesFromServer: function(){ //vue assigns 'this' to the app
			//fetch("https://essay-log-book.herokuapp.com/notes").then((response) => {
			fetch(address+"notes").then((response) => {
				console.log("server contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Notes = data;
				})
			});
		},

		fetchEssaysFromServer: function(){ //vue assigns 'this' to the app
			//fetch("https://essay-log-book.herokuapp.com/essays").then((response) => {
			fetch(address+"essays").then((response) => {
				console.log("server contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Essays = data;
				})
			});
		},
		fetchStudentsFromServer: function(){
			//fetch("https://essay-log-book.herokuapp.com/students").then((response) => {
			fetch(address+"students").then((response) => {
				console.log("students contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Students = data;
				})
			})
		},
		fetchUsersFromServer: function(){
			//fetch("https://essay-log-book.herokuapp.com/users").then((response) => {
			fetch(address+"users").then((response) => {
				console.log("users contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Users = data;
				})
			})
		}
	},

	//TODO: 'loginUser' function
	created: function () {
	console.log("App is loaded and ready.");
	this.fetchUsersFromServer();
	this.fetchStudentsFromServer();
	this.fetchEssaysFromServer();
	this.fetchNotesFromServer();
	}
});




////////////////////////////////////////NOTES/////////////////////////////////////

// v-for - add the v-for to the element that is going to be repeated. 
// v-if
// v-else
// v-show
// use {{ SOMETHING }} to use as the target to be injected.


//check out URLsearchparam
/*
filtering and sorting stuff.
		fetchEssaysFromServer: function(){ //vue assigns 'this' to the app
			fetch("http://localhost:3000/essays?student=" +encodeURIComponent(filterStudent)).then((response) => {
				console.log("server contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Essays = data;
				})
			});
		},
*/

			/* VALIDATION EXAMPLE
			if (!this.validateName()){
				return;
			}
			*/
		
		/* EXAMPLE DATA VALIDATION
		validateName: function (){
			//validate entries.
			if (this.inputName.length == 0){
				return false;
			}
			if (!["asdf", "asdf"].includes(this.inputFname.toLowerCase())){
				return false;
			}
			return true;
		},
		*/