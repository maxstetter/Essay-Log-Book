var app = new Vue({
	el: '#app',
	data: {
		workouts: [],
		workoutlist: [{
		}],
		inputName: "" ,
		inputMuscle: "",
		inputSets: "",
		inputReps: "",
		inputWeight: "" 
	},
	methods: {
		clickMe: function() {
		},
		updateWorkout: function () {

			var data = "name=" +encodeURIComponent(this.inputName);
			data += "&muscle=" +encodeURIComponent(this.inputMuscle);
			data += "&sets=" +encodeURIComponent(this.inputSets);
			data += "&reps=" +encodeURIComponent(this.inputReps);
			data += "&weight=" +encodeURIComponent(this.inputWeight);

			fetch("http://localhost:3000/workouts", {
				method: "POST",
				body: data,
				headers: {"Content-Type": "application/x-www-form-urlencoded"}
				 }).then((response) => {
					 this.fetchWorkoutsFromServer();
				 });
				 
			this.workoutlist.push({
				name: this.inputName,
				muscle: this.inputMuscle,
				sets: this.inputSets,
				reps: this.inputReps,
				weight: this.inputWeight			
			})
			this.inputName = ""
			this.inputMuscle = ""
			this.inputSets = ""
			this.inputReps = ""
			this.inputWeight = ""
		},

		fetchWorkoutsFromServer: function(){ //vue assigns 'this' to the app
			fetch("http://localhost:3000/workouts").then((response) => {
				console.log("server contacted.")
				response.json().then((data) =>{
					console.log("data: ", data);
					this.workouts = data;
				})
			});
		}
	},
	created: function () {
	console.log("App is loaded and ready.");
	this.fetchWorkoutsFromServer();
	}
});

// v-for - add the v-for to the element that is going to be repeated. 
// v-if
// v-else
// v-show
// use {{ SOMETHING }} to use as the target to be injected.

