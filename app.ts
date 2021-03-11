import fs from "fs";
import path from "path";
import XLSX from "xlsx";

function App(filename: string) {
  fs.readFile(path.join(__dirname, filename), (err, data) => {
    if (err) throw err;
    let file = JSON.parse(data as any);
    let template = {
      name: file.name,
      timestamp: file.timestamp,
      totalPass: file.totalPass,
      totalFail: file.totalFail,
      results: file.results.map((v: any) => ({
        name: v.name,
        url: v.url,
        responseCode: JSON.stringify(v.responseCode),
        tests: JSON.stringify(v.tests),
        testPassFailCounts: JSON.stringify(v.testPassFailCounts),
      })),
    };
    const { results, ...rest } = template;
    const ws = XLSX.utils.json_to_sheet(results, undefined);
    const overviewSheet = XLSX.utils.json_to_sheet([rest], undefined);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, overviewSheet, "Test Overview");
    XLSX.utils.book_append_sheet(wb, ws, template.name);
    XLSX.writeFile(wb, `${template.name}.xlsx`);
  });
}

const myArgs = process.argv.slice(2);
if (myArgs?.length > 0) {
  App(myArgs[0]);
} else {
  console.log("Program need filename argument");
}

export default App;

// npm start postname_test_run.json
