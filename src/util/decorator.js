import { MessageBox } from 'element-ui'
export function confirmation(
  message1,
  message2 = '提示',
  type = 'warning',
  confirmButtonText = '确定',
  cancelButtonText = '取消'
) {
  return function (target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = function (...args) {
      MessageBox.confirm(message1, message2, {
        confirmButtonText,
        cancelButtonText,
        type,
      }).then(oldValue.bind(this, ...args))
    }

    return descriptor
  }
}
