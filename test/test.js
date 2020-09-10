const request = require('./https.js')

requestPayload = {
  pageIndex: 1,
  pageSize: 10
}
request({
  url: '/market/goods/list',
  method: "post",
  requestPayload
}).then(res => {
  console.log(res);
})

