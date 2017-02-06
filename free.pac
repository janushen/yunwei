
var PROXY_ADDR = 'SOCKS5 0.0.0.0:9500; SOCKS 0.0.0.0:9500';
var WHITE_HOSTS = {};
var WHITE_URL_KEYWORDS = [];
var BLACK_HOSTS = {"gmail.com": true,"google.com": true,"wikimedia.org": true,"chrome.com": true,"gstatic.com": true,"is.gd": true,"g.cn": true,"googleusercontent.com": true,"googleadservices.com": true,"google.com.hk": true,"goo.gl": true,"doubleclick.net": true,"j.mp": true,"google.co.id": true,"chromium.org": true,"google.co.jp": true,"google.com.sg": true,"google-analytics.com": true,"wikipedia.org": true,"cl.ly": true,"ggpht.com": true,"googlecode.com": true,"t.co": true,"googlesyndication.com": true,"ff.im": true,"inoreader.com": true,"bit.ly": true,"feedly.com": true,"googleapis.com": true};
var BLACK_URL_KEYWORDS = [];
var BLOCKED_HOSTS = {};
var BLOCKED_URL_KEYWORDS = [];

WHITE_HOSTS['localhost'] = true;
WHITE_HOSTS['127.0.0.1'] = true;

function inHosts(host, hosts) {
    var hostParts = host.split('.'), testHost = [];
    while (hostParts.length) {
        testHost.unshift(hostParts.pop());
        if (hosts[testHost.join('.')]) {
            return true;
        }
    }
}

function inKeywords(uri, keywords) {
    for (var i = 0; i < keywords.length; i++) {
        if (uri.indexOf(keywords[i]) >= 0) {
            return true;
        }
    }
}

function FindProxyForURL(url, host) {
    if (inHosts(host, WHITE_HOSTS) || inKeywords(url, WHITE_URL_KEYWORDS))
        return 'DIRECT';

    if (inHosts(host, BLOCKED_HOSTS) || inKeywords(url, BLOCKED_URL_KEYWORDS))
        return 'SOCKS5 127.0.0.1:23183';

    if (inHosts(host, BLACK_HOSTS) || inKeywords(url, BLACK_URL_KEYWORDS))
        return PROXY_ADDR;

    return true ? 'DIRECT' : PROXY_ADDR;
}
