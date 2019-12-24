const https = require('https');

async function retrieveArticle(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {

      const resData = [];
      res.on('data', chunk => {
        console.log(chunk)
        resData.push(chunk)
      })
      .on('end', () => {
        const resultData = resData.join()
        console.log(resultData)
        resolve('hoho')
      })
    })
    .on('error', (err) => {
      reject(err)
    })
  })
}

retrieveArticle('https://www.google.com/')
.then((msg) => {
  console.log(msg)
})
.catch(err => {
  console.error(err)
})

module.exports = {
  retrieveArticle
};
