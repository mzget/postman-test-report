import fs from "fs";
import path from "path";

function App(filename: string) {
  fs.readFile(path.join(__dirname, filename), (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data as any);
    console.log(student);
  });
}

const myArgs = process.argv.slice(2);
if (myArgs?.length > 0) {
  App(myArgs[0]);
} else {
  console.log("Program need filename argument");
}

export default App;
