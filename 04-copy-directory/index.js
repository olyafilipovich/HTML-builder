const fs = require('fs');
const path = require ('path');



const srcFolder  = (path.join(__dirname, 'files'));
const destFolder = (path.join(__dirname, 'files-copy'));

fs.rm(path.join(__dirname, 'files-copy'), { recursive:true, force:true}, (err) => {
    fs.mkdir(path.join(__dirname, 'files-copy'),  { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        copyDir(srcFolder, destFolder);
    });
})

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



