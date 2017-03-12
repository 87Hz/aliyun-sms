### 阿里云短信服务

这是一个简单的调用阿里云短信服务的Node库， 仅仅需要调用一个函数，就可以调用阿里云的短信服务API。

```js
sendSms({
  accessKeyId: '阿里云AccessKeyId',
  accessKeySecret: '阿里云AccessKeySecret',
  signName: '短信签名',
  templateCode: '短信模板',
  to: '13312345678;13212345678',
  paramString: '{code: 8888}'
})
```

