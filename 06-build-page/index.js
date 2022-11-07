const fs  = require ('fs');
const path = require ('path');

// create new folder project-dist
fs.mkdir(path.join(__dirname, 'project-dist'),  { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
});


const pathToNewHtml = (path.join(__dirname, 'project-dist'));
const pathToNewIndexhtml = (path.join(pathToNewHtml, 'index.html'));
const pathToTemplateFile  = (path.join(__dirname, 'template.html'))

//read folder 'components'

const pathToComponents = (path.join(__dirname, 'components'));
fs.readdir(pathToComponents, { withFileTypes: true }, (err, files) => {
  //let arrComponents = [];
    if(err) {
      console.log(err);
    } else {

      files.forEach((file) => {
        const fileType  = path.extname(file.name);
        if(file.isFile() && fileType === '.html') {
            //console.log(file);
            let pathIntoHTMLFile = (path.join(pathToComponents, file.name));
            let fileName = path.parse(pathIntoHTMLFile).name;
            //arrComponents.push(fileName);
            fs.readFile(pathIntoHTMLFile, 'utf-8', (err, content) => {
                if(err) throw err; 
                fs.readFile(pathToTemplateFile, 'utf-8', (err, data) => {
                  if(err) throw err;
                  let searchElement = `{{${fileName}}}`;
                  if (data.includes(searchElement)) {
                        data = data.replace(searchElement, `${content}`);
                        
                    };
       
                  });
                  
            });

        };
      });
        //console.log(arrComponents);
        //changeContent (pathToNewIndexhtml, arrComponents);
        fs.writeFile(pathToNewIndexhtml, data, (err) => {
          if(err) throw err;
    });
    };
})

/*fs.readFile(pathToTemplateFile, 'utf-8', (err, data) => {
  if(!err) {
    fs.writeFile (pathToNewIndexhtml, data, err => {
      if(err) throw err;
    });
  } else {
    console.log(err);
  }
});
//console.log(data);*/



