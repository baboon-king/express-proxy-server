
const express = require('express')
const bodyParser = require('body-parser')
const superagent = require('superagent')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// target api
const api = 'http://www.xxxxxxxxx.cn/'

//拦截器允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  // 允许证书 携带cookie
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

app.get('/', function (req, res) {
  if (req.query.echostr) {
    res.end(req.query.echostr)
  } else {
    res.send('用于转发接口使用')
  }
})
app.get('*', callback);
app.post('*', callback);
app.listen(8082);

function callback(req, res) {
  const nres = res
  const data = req.query
  const ServerCookie = req.headers.cookie
  const sreq = superagent.get(api + req.url)
  //如果使用 Accept存在的的话则设置为Accept的值
  sreq.set({
    'Accept': data.Accept || 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  })
  ServerCookie && sreq.set('Cookie', ServerCookie)
  data.datas && sreq.query(data.datas)
  sreq.end((err, res) => {
    handleResp(err, nres, res);
  })
}

function handleResp(err, nres, res) {
  if (err) {
    nres.json({ "msg": "请求发生错误可能是api地址无效或者Accept设置不正确或者请求方式错误" });
  } else {
    console.log(res);
    if (JSON.stringify(res.body) == "{}") {
      var text = res.text;
      if (text.charAt(0) == "{" && text.charAt(text.length - 1) == "}") {
        nres.json(JSON.parse(text));
      } else {
        nres.json({ "data": text });
      }
    } else {
      nres.json(res.body);
    }
  }
}

