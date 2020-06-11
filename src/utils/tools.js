/** 
 * 深拷贝
 * @params {Object} obj 对象
*/
const deepClone = (obj) => {
  let objClone = Array.isArray(obj) ? [] : {}
  if(obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断obj子元素是否为对象，如果是，递归复制
        if(obj[key] && typeof obj[key] === 'object') {
          // 深拷贝日期类型
          if(obj[key] instanceof Date){
            objClone[key] = new Date(obj[key].valueOf())
            console.log('deepClone', objClone[key])
          } else {
            objClone[key] = deepClone(obj[key])
          }
        } else {
          // 不为对象，仅仅简单的复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

/** 
 * 同步文件下载地址
 * @param {string} link 下载地址
 * dispatchEvent 向一个指定的事件目标派发一个事件，适用于通过手动的使用dispatchEvent()方法派发的事件
 * initMouseEvent 已废弃
*/
const downloadFileAsync = (link) => {
  const aLink = document.createElement('a')
  aLink.href = link
  let event
  if(window.MouseEvent) {
    event = new MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvent')
    event.initMouseEvent('click', true, false, window, 0,0,0,0,0,false,false,false,false,0,null)
  }
  aLink.dispatchEvent(event)
}

/** 
 * 参数转换
 * urlEncode 对get post方法中的 & # ？ 等符号不换转义编码
 * encodeURIComponent 对统一资源标识符（URI）的组成部分进行编码的方法， 除以下字符外，其他都转义
 * A-Z a-z 0-9 - _ . ! ~ * ' ( )
*/

const urlEncode = (param, key, encode) => {
  if (param === null) return ''
  let paramStr = ''
  const t = typeof param
  if(t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += `${key}=${encode === null || encode ? encodeURIComponent(param): param}`
  } else {
    // params是对象，递归解析
    Object.keys(param).forEach(item => {
      const k = key === null ? item : key + (param instanceof Array ? `[${item}]` : `.${item}`)
      paramStr = paramStr ? `${paramStr}&${urlEncode(param[item], k, encode)}` : urlEncode(param[item], k, encode)
    })
  }
  return paramStr
}

export {
  deepClone,
  downloadFileAsync,
  urlEncode
}