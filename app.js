
var app = new Vue({
	el: '#app',
	data: {
		Essays: [],
		Students: [],
		Notes: [],
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
	},
	methods: {
		clickMe: function() {
		},
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


		deleteStudent: function (student) {
			console.log("student._id: ", student._id);
			fetch("http://localhost:3000/students/"+student._id, { method: "DELETE"	
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
			fetch("http://localhost:3000/essays/"+essay._id, { method: "DELETE"	
			}).then(response => {
				if (response.status == 204){
					this.fetchEssaysFromServer();
				} else {
					console.error("error deleting essay: ", essay);
				}
			});
		},
		
		retreiveStudent: function (student) {
			fetch("http://localhost:3000/students/"+student._id, { method: "GET"
			}).then(response => {
				if (response.status == 202){
					this.fetchStudentsFromServer();
				} else {
					console.error("Error retrieving student: ", student);
				}
			})
		},
		
		validatefName: function (){
			if (this.inputFname.length == 0){
				return false;
			}
			return true;
		},
		validatelName: function (){
			if (this.inputLname.length == 0){
				return false;
			}
			return true;
		},
		validateBirthday: function (){
			if (this.inputBirthday.length == 0){
				return false;
			}
			return true;
		},
		validateDoa: function (){
			if (this.inputDoa.length == 0){
				return false;
			}
			return true;
		},
		createStudent: function () {
			
			/* VALIDATION EXAMPLE
			if (!this.validateName()){
				return;
			}
			*/
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
			//data += "&weight=" +encodeURIComponent(this.inputWeight);

			fetch("http://localhost:3000/students", {
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

		createEssay: function () {
/*			
			if (!this.validateSize()){
				return;
			}
			if (!this.validateDate()){
				return;
			}
			if (!this.validateReason()){
				return;
			}
			if (!this.validateFrom()){
				return;
			}
*/
			
			var data = "size=" +encodeURIComponent(this.inputSize);
			data += "&reason=" +encodeURIComponent(this.inputReason);
			data += "&time=" +encodeURIComponent(this.inputEdate);
			data += "&from=" +encodeURIComponent(this.inputFrom);
			data += "&student=" + encodeURIComponent(this.selectStudent);
			
			fetch("http://localhost:3000/essays", {
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
			fetch("http://localhost:3000/essays/"+essay._id, { method: "PUT", body: data, headers: {"Content-Type": "application/x-www-form-urlencoded"}
			}).then(response => {
				if(response.status == 202){
					this.fetchEssaysFromServer();
				} else {
					console.error("Error marking essay.", essay);
				}
			})
		},

		editNote: function(note){
			var data = "prognote=" +note.prognote;
			console.log("ASDF")
			fetch("http://localhost:3000/notes/"+note._id, { 
				method: "PUT",
				body: data,
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
			}).then(response => {
				if(response.status == 202){
					this.fetchNotesFromServer();
				} else {
					console.error("Error editing note.", note);
				}
			})
		},
		
		createNote: function(){
			var data = "prognote=" +encodeURIComponent(this.inputNote);
			data += "&date=" +encodeURIComponent(this.inputNdate);
			data += "&from=" +encodeURIComponent(this.inputNfrom);
			data += "&student=" +encodeURIComponent(this.selectStudent);
			
			fetch("http://localhost:3000/notes", {
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

		fetchNotesFromServer: function(){ //vue assigns 'this' to the app
			fetch("http://localhost:3000/notes").then((response) => {
				console.log("server contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Notes = data;
				})
			});
		},

//check out URLsearchparam
		fetchEssaysFromServer: function(){ //vue assigns 'this' to the app
			fetch("http://localhost:3000/essays").then((response) => {
				console.log("server contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Essays = data;
				})
			});
		},
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
		fetchStudentsFromServer: function(){
			fetch("http://localhost:3000/students").then((response) => {
				console.log("students contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Students = data;
				})
			})
		}
	},
	created: function () {
	console.log("App is loaded and ready.");
	this.fetchStudentsFromServer();
	this.fetchEssaysFromServer();
	this.fetchNotesFromServer();
	}
});

// v-for - add the v-for to the element that is going to be repeated. 
// v-if
// v-else
// v-show
// use {{ SOMETHING }} to use as the target to be injected.

