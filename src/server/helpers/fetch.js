/* eslint-disable no-console */
const https = require("https");

async function retrieveArticle(url) {
  // TODO: retrieve the html string from given url and return as promise
  // let body = [];
  // const temp1 = await https.get(url);
  // console.log(temp1);
  // const temp2 = await temp1.on("data", chunk => body.push(chunk));
  // const temp3 = await temp2.on(
  //   "end",
  //   () => (body = Buffer.concat(body).toString())
  // );
  // console.log(body);

  return new Promise((resolve, reject) => {
    let body = [];
    https.get(url, res => {
      res
        .on("error", err => {
          reject(err);
        })
        .on("data", chunk => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          resolve(body);
          // console.log(typeof body); // string
        });
    });
  });
}

// retrieveArticle(
//   "https://medium.com/code-states/good-developer-1-%EC%A2%8B%EC%9D%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-5%EA%B0%80%EC%A7%80-%EA%B8%B0%EC%A4%80-b4b9f166caf7"
// );

module.exports = {
  retrieveArticle
};
