let readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);
let realPerson = {
  name: '',
  sayings: []
}

rl.question("what is the name of a real person? ", answer => {

  realPerson.name = answer;

  rl.setPrompt(`What would ${realPerson.name} say`)

  rl.prompt();

  rl.on('line', saying => {
    console.log(saying.trim());
  })
})
