/* eslint-disable no-console */
const fs = require("fs");

async function writeFile(filename, body) {
  return new Promise((resolve, reject) => {
    // TODO: save the content with specific filename
    fs.writeFile(filename, body, "utf8", err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function readFile(filename) {
  return new Promise((resolve, reject) => {
    // TODO: read the content with specific filename
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function readSourceListFile() {
  return readFile("./data/source.txt");
}

async function writeSourceListFile(body) {
  return writeFile("./data/source.txt", body);
}

async function readLineFromSourceList(nthline) {
  const temp = await readSourceListFile();
  return new Promise((resolve, reject) => {
    // TODO : read line via specific nthline
    if (temp === "") {
      reject("source.txt is empty");
    }
    const arr = temp.split("\n");
    console.log(arr);
    resolve(arr[nthline]);
  });
}

module.exports = {
  readSourceListFile,
  writeSourceListFile,
  writeFile,
  readFile,
  readLineFromSourceList
};
