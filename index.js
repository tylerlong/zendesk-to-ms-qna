const dotenv = require('dotenv')
dotenv.config()

const axios = require('axios')
const striptags = require('striptags')
const fs = require('fs')

axios.request({
  url: `https://glip.zendesk.com/api/v2/help_center/en-us/articles.json?per_page=100`,
  method: 'get',
  auth: {
    username: process.env.ZENDESK_USERNAME,
    password: process.env.ZENDESK_PASSWORD
  }
}).then(r => {
  let result = 'Question\tAnswer\tSource'
  r.data.articles.forEach(a => {
    result += `\n${a.title.replace(/\s+/g, ' ')}\t${striptags(a.body).replace(/\s+/g, ' ')}\t${a.html_url}`
  })
  // console.log(result)
  fs.writeFileSync('temp.tsv', result)
})
