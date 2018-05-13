## 阿里云短信服务 node-aliyun-sms

这是一个简单的调用阿里云短信服务的Node库， 仅仅需要调用一个函数，就可以调用阿里云的短信服务API。内部使用request-promise，所以函数的返回值为Promise。
此库默认仅用POST方式。

This is a Node package which could call Aliyun SMS service with ease. With just a function, you could simply call the API. It leverages on request-promise, hence, returning a Promise.
This package is using POST by default.

安装 Install
```
npm i --save node-aliyun-sms
```

使用 Use
```js
const sendSms = require('node-aliyun-sms')

const responseAsPromise = sendSms({
  accessKeyId: '阿里云AccessKeyId',
  accessKeySecret: '阿里云AccessKeySecret',
  signName: '短信签名(例如：XX银行) SMS Signature(e.g. XX Bank)',
  templateCode: '短信模板Code(例如：SMS_53710888) SMS Template Code(e.g. SMS_53710888)',
  to: '13312345678;13212345678',
  paramString: '{"code": "8888"}'
})

responseAsPromise.then(res => {
  console.log(res)
  /*
   * 控制台输出 Console prints：
   * {"Model":"106353688047^1108634211787","RequestId":"E8C39EF0-7889-4D9F-B8B4-FE42FCD27DCB"}
   */
})
```




