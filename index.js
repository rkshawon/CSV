const csv = require("csv-parser");
const fs = require("fs");

const formateData1 = (results) => {
  const writeStream = fs.createWriteStream("format1.txt");
  let tempName = "";
  let counter = 0;
  let len = results.length;
  let i = 0;

  while (i < len) {
    if (results[i]?.TADIG_Code == tempName) {
      let string = `edit ${results[i]?.TADIG_Code} \n set member `;
      let tempString = "";

      while (results[i]?.TADIG_Code == tempName) {
        tempString += `"${results[i]?.TADIG_Code}_${counter++}",`;
        i++;
      }
      writeStream.write(string + tempString + "\n next \n" + "\n");
    } else {
      tempName = results[i].TADIG_Code;
      counter = 0;
    }
  }
};

const formateData2 = (results) => {
  const writeStream = fs.createWriteStream("format2.txt");
  let tempName = "";
  let counter = 0;
  let len = results.length;
  let i = 0;

  while (i < len) {
    if (results[i]?.TADIG_Code == tempName) {
      let string = `edit ${
        results[i]?.TADIG_Code
      }_${counter++} \n set member "${
        results[i]?.ip_address_range
      } \n next \n  \n`;
      writeStream.write(string);
      i++;
    } else {
      tempName = results[i].TADIG_Code;
      counter = 0;
    }
  }
};

const results = [];

fs.createReadStream("input.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    formateData1(results);
    formateData2(results);
  });
