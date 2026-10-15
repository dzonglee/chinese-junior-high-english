/**
 * Created by Administrator on 2016/10/25 0025.
 */
/**
 * 获取base路径
 */
function getBasePath() {
    return getHostPath() + "/";
}
/**
 *	获取主机url
 */
function getHostPath() {
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);

    return localhostPaht;
}
/**
 *  获取上下文根路径
 */
function getContextPath(){
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}

/**
 * 获取fileServer路径
 */
function getFileServerHostPath() {
    return "http://www.fileServer.com:6789";
}
/**
 * 获取fileIpserver路径
 * @returns {string}
 */
function getFileServerIpPath() {
    return "http://192.168.1.243:6789";
}

/**
 * 服务器的下载地址
 * @returns {string}
 */
function getUploadFileServerPath() {
    return "http://192.168.1.246:2016";
}

/**
 * 获取officeWebApps路径
 * @returns {string}
 */
function getOfficeWebAppsPath() {
    return "http://192.168.1.109";
}

function getCtx(){
    var _ctx = null;
    if( null==_ctx ){
        var localObj = window.location;
        var contextPath = "/"+localObj.pathname.split("/")[1];
        _ctx = contextPath;
    }
    return _ctx;
}