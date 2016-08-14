//my first IO

//  MY FIRST I/O!
//  Exercise 3 of 13

// Write a program that uses a single synchronous filesystem operation to read a file and print the number of newlines (\n) it contains to the console (stdout), similar to running cat file | wc -l.

// The full path to the file to read will be provided as the first command-line argument (i.e., process.argv[2]). You do not need to make your own test file. 

// -------------------------------------------------------------------------------

// ## HINTS

// To perform a filesystem operation you are going to need the fs module from the Node core library. To load this kind of module, or any other "global" module, use the following incantation:

//     var fs = require('fs')

// Now you have the full fs module available in a variable named fs.

// All synchronous (or blocking) filesystem methods in the fs module end with 'Sync'. To read a file, you'll need to use fs.readFileSync('/path/to/file'). This method will return a Buffer object containing the complete contents of the file.

// Documentation on the fs module can be found by pointing your browser here:
//   file:///Users/davidkatz/npm-global/lib/node_modules/learnyounode/node_apidoc/fs.html

// Buffer objects are Node's way of efficiently representing arbitrary arrays of data, whether it be ascii, binary or some other format. Buffer objects can be converted to strings by simply calling the toString() method on them. e.g. var str = buf.toString().

// Documentation on Buffers can be found by pointing your browser here:
//   file:///Users/davidkatz/npm-global/lib/node_modules/learnyounode/node_apidoc/buffer.html

// If you're looking for an easy way to count the number of newlines in a string, recall that a JavaScript String can be .split() into an array of substrings and that '\n' can be used as a delimiter. Note that the test file does not have a newline character ('\n') at the end of the last line, so using this method you'll end up with an array that has one more element than the number of newlines.

//my learnyounode Command: /Users/davidkatz/npm-global/lib/node_modules/learnyounode/learnyounode.js

//an array of the terminal command input
 var fileArray = process.argv
 var fileOfInterest = fileArray[2]

//grabs the fs module for reading files from node
 var fsModule = require('fs')

//a reading of the fileOfInterest
var fileRead = fsModule.readFileSync(fileOfInterest)
var fileReadToString = fileRead.toString()

//test code
// var testString = "fish \n fish \n fish"
// var testStringArray = testString.split("\n")

// var nCount = testStringArray.length - 1 
// console.log(nCount)

//from test code...



var fileArray = fileReadToString.split("\n")
var bsnCount = fileArray.length -1
console.log(bsnCount)

