export function encodeUriParams(data: object) {
  let str = ''
  
  Object.entries(data).forEach(param => {
    str += `${encodeURI(param[0])}=${encodeURI(param[1])},`
  })
  
  return str.substring(0, str.length)
}