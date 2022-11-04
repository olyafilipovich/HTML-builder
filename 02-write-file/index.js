const {stdin, stdout}  = process;
const fs = require ('fs');
const path = require ('path');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Hello, guy! What is your favourite holiday?\n');
stdin.on('data', data => {
    if(data.toString().trim() !== 'exit') {
        output.write(data);
    } else {
        stdout.write('See you later!');
        process.nextTick(() => { process.exit(0); });
    }
});
process.on('SIGINT', () => {   
      stdout.write('See you later!');
      process.nextTick(() => { process.exit(0); });
});