let Cookie = {
  get: (name) => {
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) {
      return unescape(decodeURIComponent(arr[2])) } else {
      return null }
  },
  set: (name, value, expires, path, domain, secure) => {
    let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires instanceof Date) { cookieText += '; expires=' + expires.toGMTString() }
    if (path) { cookieText += '; path=' + path }
    if (domain) { cookieText += '; domain=' + domain }
    if (secure) { cookieText += '; secure' }
    document.cookie = cookieText
  },
  unset: function(name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure)
  }
}

export default Cookie
