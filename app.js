//const { response } = require("express");

var app = new Vue({
	el: '#app',
	data: {
		Essays: [],
		Students: [],
		inputFname: "" ,
		inputLname: "",
		inputBirthday: "",
		inputDoa: "",
		inputEdate: ""
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

		fetchEssaysFromServer: function(){ //vue assigns 'this' to the app
			fetch("http://localhost:3000/essays").then((response) => {
				console.log("server contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.Essays = data;
				})
			});
		},

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
	}
});

// v-for - add the v-for to the element that is going to be repeated. 
// v-if
// v-else
// v-show
// use {{ SOMETHING }} to use as the target to be injected.

