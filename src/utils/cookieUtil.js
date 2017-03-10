//获取对应用户名的cookie
function getCookie(name){
	let cookieName=encodeURIComponent(name)+'='
	let cookieStart=document.cookie.indexOf(cookieName)
	let cookieValue=null
	let cookieEnd=null

	if(cookieStart>-1){
		cookieEnd=document.cookie.indexOf(';',cookieStart)
		if(cookieEnd==-1)
			cookieEnd=document.cookie.length
	}
	cookieValue=decodeURIComponent(document.cookie.substr(cookieStart+cookieName.length,cookieEnd))
	return cookieValue			
}

//设置对应用户名的cookie
function setCookie(name,value,expires,path,domain,secure){
	let cookieText=encodeURIComponent(name)+'='+encodeURIComponent(value)
	if(expires instanceof Date)
		cookieText+='; expires='+expires.toGMTString()
	if(path)
		cookieText+='; path='+path
	if(domain)
		cookieText+='; domain='+domain
	if(secure)
		cookieText+='; secure'
	document.cookie=cookieText
}

function unsetCookie(name,path,domain,secure){
	setCookie(name,'',new Date(0),path,domain,secure)
}

export{
	getCookie,setCookie,unsetCookie
}