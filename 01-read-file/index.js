const fs = require ('fs');
const path = require ('path');

const readableFile = fs.createReadStream(path.join(__dirname, 'text.txt'));
let data = "";
readableFile.on('data', chunk => data += chunk);
readableFile.on('end', () => console.log(data));



