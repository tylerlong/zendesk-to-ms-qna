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
  let result = ''
  r.data.articles.forEach(a => {
    result += `${a.title.replace(/\s+/g, ' ')}\t${striptags(a.body).replace(/\s+/g, ' ')} ${a.html_url}\n`
  })
  // console.log(result)
  fs.writeFileSync('temp.tsv', result)
  // const articles = r.data.articles.slice(0, 5)
  // axios.request({
  //   url: `https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/${process.env.MS_QNA_KB_ID}`,
  //   method: 'patch',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Ocp-Apim-Subscription-Key': process.env.MS_QNA_SUB_KEY
  //   },
  //   data: {
  //     add: {
  //       qnaPairs: articles.map(a => ({
  //         question: a.title.replace(/\s+/g, ' '),
  //         answer: striptags(a.body).replace(/\s+/g, ' ')
  //       })),
  //       urls: articles.map(a => a.html_url)
  //     }
  //   }
  // }).then(r => {
  //   console.log(r.data)
  // }).catch(e => {
  //   console.log(e.response.data)
  // })
})

// Query KB //

// axios.request({
//   url: `https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/${process.env.MS_QNA_KB_ID}/generateAnswer`,
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json',
//     'Ocp-Apim-Subscription-Key': process.env.MS_QNA_SUB_KEY
//   },
//   data: {
//     question: 'hi',
//     top: 3
//   }
// }).then(r => {
//   console.log(r.data)
// })
