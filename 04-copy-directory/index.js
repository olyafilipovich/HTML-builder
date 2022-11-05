const fs = require('fs');
const path = require ('path');

fs.mkdir(path.join(__dirname, 'files-copy'),  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
});

const srcFolder  = (path.join(__dirname, 'files'));
const destFolder = (path.join(__dirname, 'files-copy'));

function copyDir(src, dest) {
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
        if(err) {
          console.log(err);
        } else {
          files.forEach((file) => {
            if(file.isFile()) {
                //console.log(file);
                let pathIntoFolder = (path.join(src, file.name));
                let pathFileDestination = (path.join(dest, file.name));
                fs.copyFile(pathIntoFolder, pathFileDestination, (err) => {
                    if(err) {
                        console.log(err);
                    };
                });
            } else {
                let newPathSourceFolder = (path.join(srcFolder, file.name));
                let newPathDestinationFolder = (path.join(destFolder, file.name));
                copyDir(newPathSourceFolder, newPathDestinationFolder);
            }
           });
        };
        });
    };

copyDir(srcFolder, destFolder);

