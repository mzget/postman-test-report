const fs = require("fs");
const path = require("path");

function ReadFile(filename) {
  fs.readFile(path.join(__dirname, filename), (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
  });
}

export default ReadFile;
