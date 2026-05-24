const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'calc> '
});

function calculate(input) {
  try {
    const expression = input.replace(/[^0-9+\-*/().\s]/g, '');
    if (!expression.trim()) return null;
    return Function(`"use strict"; return (${expression})`)();
  } catch (error) {
    return null;
  }
}

console.log('Simple JS calculator. Enter expressions or "exit".');
rl.prompt();

rl.on('line', line => {
  const input = line.trim();
  if (input === 'exit' || input === 'quit') {
    rl.close();
    return;
  }

  if (!input) {
    rl.prompt();
    return;
  }

  const result = calculate(input);
  if (result === null || Number.isNaN(result)) {
    console.log('Error: invalid expression');
  } else {
    console.log(result);
  }
  rl.prompt();
}).on('close', () => {
  console.log('Bye.');
  process.exit(0);
});