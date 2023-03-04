/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
import { getDepartment } from '@/api/department'
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
export function validateMobile(rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/
  if (!value) {
    return callback(new Error('手机号不能为空'))
  }
  else if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }

}
