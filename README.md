### 阿里云短信服务

WIP：此库还未完成。

这是一个简单的调用阿里云短信服务的Node库， 仅仅需要调用一个函数，就可以调用阿里云的短信服务API。
为了简单，此库所用函数默认仅用POST方式。

安装
```shell
npm i --save node-aliyun-sms
```

使用
```js
const sendSms = require('node-aliyun-sms')

sendSms({
  accessKeyId: '阿里云AccessKeyId',
  accessKeySecret: '阿里云AccessKeySecret',
  signName: '短信签名',
  templateCode: '短信模板',
  to: '13312345678;13212345678',
  paramString: '{code: 8888}'
})
```

