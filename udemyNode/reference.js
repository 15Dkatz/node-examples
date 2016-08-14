// //pass by value
// function change(b) {
// 	b = 2;
// }

// var a = 1 
// change(a)
// console.log(a)

// //does not change a when passed into change(), just creates a new reference.

// function changeObj(d) {
// 	d.prop1 = function() {};
// 	d.prop2 = {};
		
// }

// var c = {};
// c.prop1 = {};
// changeObj(c)
// console.log(c)

var firstname = "Legolas";

(function(nickname){
	var firstname = 'David';
	console.log(firstname);
	console.log(nickname)
}(' the Destroyer'));

console.log(firstname)
//immediately invoked

//demonstrates the importance of scope