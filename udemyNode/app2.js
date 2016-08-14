
//.js extension unnecessary
var greet = require("./greet.js")
greet();

// //the code inside read.js = protected.

// // greet()

// var superhero = {
// 	power: "flight",
// 	identity: "Clark Kent",
// 	name: "Superman",
// 	reveal: function() {
// 		console.log("My power is " + this.power + " and my identity is " + this.identity)
// 	}
// }

// // superhero.reveal()

// // console.log(superhero['name']);

// function Wizard(name, power) {
// 	this.name = name;
// 	this.power = power;
// }

// Wizard.prototype.darkpower = function() {
// 	console.log("I " + this.name + " wield the perverse power of anti-" + this.power)
// }

// var gandalf = new Wizard("gandalf", "awesomeness");

// console.log(gandalf.name);

// gandalf.darkpower();