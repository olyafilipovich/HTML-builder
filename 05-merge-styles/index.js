const fs = require('fs');
const path = require ('path');
const pathToFinish = (path.join(__dirname, 'project-dist'));
const pathToStyles = (path.join(__dirname, 'styles'));


fs.readdir(pathToStyles, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err)
    };
    let result = '';
    files.forEach((file) => {
        const fileType  = path.extname(file.name);
        if(file.isFile() && fileType === '.css') {
            //console.log(file);
            let pathFromFileCss = (path.join(pathToStyles, file.name));
            fs.readFile(pathFromFileCss, 'utf-8', (err, data) => {
                if (err) console.log(err);
                result += data;
                fs.writeFile(path.join(pathToFinish, 'bundle.css'), result, err => {
                    if (err) console.log(err);
                });
            });
        }
    });
});



