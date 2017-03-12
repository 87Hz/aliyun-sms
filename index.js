const rp = require('request-promise')
const crypto = require('crypto')
const {
  join,
  keys,
  mapKeys,
  merge
 } = require('lodash')

/* ----------
 * default value as constants
 * in case of aliyunSmsUri change, update the const below
 */
const aliyunSmsUri = 'https://sms.aliyuncs.com/'
const aliyunSmsAction = 'SingleSendSms'
const aliyunSmsFormat = 'JSON'
const aliyunSmsVersion = '2016-09-27'
const aliyunSmsSignatureMethod = 'HMAC-SHA1'
const aliyunSmsSignatureVersion = '1.0'

/* ----------
 * get signature
 */
function getSignature ({
  params,
  accessKeySecret
}) {
  const paramString = paramsToString(params)
  const stringToSign = `POST&${encodeURIComponent('/')}&${encodeURIComponent(paramString)}`

  return crypto
    .createHmac('sha1', `${accessKeySecret}&`)
    .update(stringToSign)
    .digest('base64')
}

/* ----------
 * convert params to sorted string using encodedURIComponent()
 */
function paramsToString (params) {
  const paramKvs = keys(mapKeys(params, (v, k) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`))
  return join(paramKvs.sort(), '&')
}

/* ----------
 * main function
 */
module.exports = function ({
  accessKeyId: AccessKeyId,
  accessKeySecret,
  signName: SignName,
  templateCode: TemplateCode,
  // recepient(s), delimetted by comma(,)
  to: RecNum,
  // template params
  paramString: ParamString
} = {}) {
  const now = new Date()

  const Timestamp = now.toISOString()
  const SignatureNonce = now.getTime()

  const params = {
    // public
    Format: aliyunSmsFormat,
    Version: aliyunSmsVersion,
    AccessKeyId,
    SignatureMethod: aliyunSmsSignatureMethod,
    Timestamp,
    SignatureVersion: aliyunSmsSignatureVersion,
    SignatureNonce,
    // local
    Action: aliyunSmsAction,
    SignName,
    TemplateCode,
    RecNum,
    ParamString
  }

  const form = merge({
    Signature: getSignature({params, accessKeySecret})
  }, params)

  return rp({
    uri: aliyunSmsUri,
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded'
    },
    form
  })
}
