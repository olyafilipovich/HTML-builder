const fs = require ('fs');
const path = require('path');

const pathToFolder = (path.join(__dirname, 'secret-folder'));
fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
    if(err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        if(file.isFile()) {
            //console.log(file);
            let pathIntoDirectory = (path.join(pathToFolder, file.name));
            fs.stat(pathIntoDirectory, (err, stats) => {
                if(err) throw err;
                if (stats.isFile()) {
                  let fileName = path.parse(pathIntoDirectory).name;
                  let fileType  = path.extname(file.name).slice(1);
                  let fileSize = stats.size;
                  console.log(`${fileName} - ${fileType} - ${fileSize/1000}kb`);
                };
            });
       };
    });
    };
});
