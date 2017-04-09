//获取对应用户名的cookie
function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if (arr = document.cookie.match(reg))
    return unescape(decodeURIComponent(arr[2]))
  else
    return null
}

//设置对应用户名的cookie
function setCookie(name, value, expires, path, domain, secure) {
  let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
  if (expires instanceof Date)
    cookieText += '; expires=' + expires.toGMTString()
  if (path)
    cookieText += '; path=' + path
  if (domain)
    cookieText += '; domain=' + domain
  if (secure)
    cookieText += '; secure'
  document.cookie = cookieText
}

function unsetCookie(name, path, domain, secure) {
  setCookie(name, '', new Date(0), path, domain, secure)
}

export {
  getCookie,
  setCookie,
  unsetCookie
}
