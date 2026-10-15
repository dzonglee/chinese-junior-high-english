$(function () {
 /* var header_tem =
      '<header>' +
      '<div class="head clear">' +
      '<div class="main clear">' +
      '<a href="#" class="logo">' +
      '<img src="images/logo_img.png" alt="">' +
      '<span>基础教育教材网</span></a>' +
      '<div class="fr">' +
      '<div class="wrap_search">' +
      '<input type="text" placeholder="请输入你要搜索的内容" class="search_input">' +
      '<span class="icon_search"></span></div>' +
      '<div class="wrapUser">' +
      '<img src="images/defalt_photo.png" alt="">' +
      '</div></div></div></div>' +
      '</div>' + '<div class="main clear">' +
      '<ul class="nav">' +
      '<li>' +
      '<a href="index.html">首页</a></li>' +
      '<li class="line"></li><li>' +
      '<a href="#">新闻动态</a></li>' +
      '<li class="line"></li><li>' +
      '<a href="#">新书推荐</a></li>' +
      '<li class="line"></li><li>' +
      '<a href="#">资源中心</a></li>' +
      '<li class="line"></li><li>' +
      '<a href="#">在线投稿</a></li>' +
      '<li class="line"></li><li>' +
      '<a href="#">在线评比</a></li>' +
      '<li class="line"></li></ul>' +
      '</div></header>';
  var footer_tem = '<footer class="ftbt">版权所有 ㉢ 2014 北京师范大学出版集团：Copyright ㉢ 2014 BNUPG All rights reserved.京ICP备09060674号-3京新出网社（京）字041<a href="#">版权声明</a>|<a href="#">联系我们</a></footer>';

  Vue.component('vheader', {
    template: header_tem,
    mounted:function(){
      var local = window.location.pathname;
      var str = local.substr(local.lastIndexOf("/")+1);
      $(".nav").find("li").find("a").each(function(){
        if($(this).attr("href") == str){
          $(this).parent().addClass("cur");
        }
      })
    }
  });

  Vue.component('vfooter', {
    template: footer_tem
  });*/
    $(function () {
        $(".warnImg").mouseenter(function () {
            $(this).find(".warn").show();
        }).mouseleave(function () {
            $(this).find(".warn").hide();
        })
    });
  //获取url参数
  function GetRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }

  //筛选条件的tab
  $(".btn_change").click(function () {
    $(".classification").hide();
    $(this).parent().next().show();
      return false;
  });
  $(".classification").on("click", "li", function () {
    $(this).parents(".classification").hide();
      return false;
  });
  $(document).click(function () {
    $(".school dl dd").hide();
  });

  $(".orderBy>li>span").click(function () {
    $(this).siblings().removeClass("selectz").end().addClass("selectz");
  });
  $(".favorite").click(function () {
    $(this).addClass("favorite_F");
  });
  $(".zan").click(function () {
    $(this).addClass("zan_already");
  });
  //评分star
  var flagStar = false;
  $("#starBg a").click(function () {
    if(flagStar == false){
      flagStar = true;
    }else{
      $("#starBg label").remove();
    }
  });
  //分页效果
$(".pages div a:not([class])").click(function(){
  $(".pages div a").removeClass("cur");
  $(this).addClass("cur");
})
    $.ajaxSetup({
            beforeSend: function () {
               /* $("body").append('<div class="popup-content">'
                    +'<div id="fe_window_mask" class="fe_window_mask" style="display:block;position:fixed;left:0;top:0;z-index:9996;width:100%;height:100%;margin:0;padding:0;background:#000 none repeat scroll 0 0;opacity:0.3;filter:Alpha(Opacity=30);_position:absolute;_height:expression(documentElement.scrollTop + document.documentElement.clientHeight);">'
                    +'<iframe class="fe_window_iframe" frameborder="0" style="background-color:#000;height:100%;width:100%;opacity:0;"filter:alpha(Opacity=0);></iframe>'
                    +'</div></div>'
                );*/
                $("body").append("<div class='maskabc' style='position: fixed;top:0;left:0;right:0;bottom:0;background: rgba(0,0,0,0.1);'><img style='width:50px;height:50px;position: absolute;top:50%;left:50%;margin-left:-25px' src='images/waiting.gif'/></div>");
            },
            complete: function () {
                var intervalHandle = setInterval(function(){
                    if ($(".maskabc").size() > 0) {
                        $(".maskabc").remove();
                        clearInterval(intervalHandle)
                    }
                },300)

                }
    });
});
//提示弹窗
function alertwarn(message,callback,close){
  var alertstr = '<div class="mask alertwarn"><div class="alertbox"><p>'+message+'</p></div></div>';
  $("body").append(alertstr);
  $(".alertwarn").show();
  setTimeout(function () {
    if(callback){
      callback();
    }else if(close){
      $(".alertwarn").remove();
    }else{
      window.location.reload();
  }
 },2000)
}
//积分规则弹窗
function freealert(){
  var alertstr = '<div class="mask freeknow" style="display:block;"><div class="alertbox"><span class="closeFreeknow"></span>'+
      '<h1>积分规则</h1>'+
      '<div class="freecont">'+
      '<h2>1.基础教育教材网的积分获取规则</h2>'+
      '<table><tr><th>用户行为</th><th>获得积分值</th><th>备注</th></tr><tr><td>上传一个在线评比作品，经审核入库</td><td>2</td><td></td></tr><tr><td>在线投稿一条资源，经审核入库</td><td>10</td><td></td></tr>'+
      '<tr><td>上传头像</td><td>2</td><td>仅1次</td></tr><tr><td>完善账户信息</td><td>5</td><td>仅1次</td></tr><tr><td>纠错一次经采纳</td><td>5</td><td></td></tr><tr><td>资源或新闻分享</td><td>2</td><td>每日限3次</td></tr></table>'+
      '<h2>2.基础教育教材网的积分使用规则</h2>'+
      '<p>在编辑上传和审核资源时，有著作权的资源，默认需要5个积分下载。</p></div>'+
      '<div class="closeFreeknow">关闭</div></div></div>';
  $("body").append(alertstr);
  $(".closeFreeknow").click(function(){
    $(".freeknow").remove();
  })
}
//是否确定弹窗
function deletBox(message){
  var alertstr = '<div class="mask deleteBox" style="display: block;"><div class="alertbox">'+
      '<span class="closedeleteBox"></span><h1>提示</h1><p>'+message+'</p><div class="closedeleteBox nobtn">取消</div><button class="yesbtn">确定</button></div></div>';
  $("body").append(alertstr);
  $(".closedeleteBox").click(function(){
    $(".deleteBox").remove();
  });
  $(".yesbtn").click(function(){
    $(".deleteBox").remove();
  })
}

/**
 * 显示文件大小
 * @param size		单位字节
 * @returns {String}
 */
function displayFileSize(size) {
	var KB = 1024;
	var MB = KB * 1024;
	var GB = MB * 1024;
	var value = 0;
	var result = "";
    if (size >= GB) {
        value = size / GB;
        result = value.toFixed(1) + "G";
    } else if (size >= MB) {
        value = size / MB;
        result = value.toFixed(1) + "M";
    } else if (size >= KB) {
        value = size / KB;
        result = value.toFixed(1) + "K";
    } else {
        result = size + "B";
    }
    return result;
}
//过滤标签换行等
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    str=str.replace(/‖/ig,'');//去掉‖;
    return str;
}

function truncateString(url) {
    // console.log('truncateString url: ' + url);
    // if (str.indexOf('?')!== -1) {
    //     return str.substring(0, str.indexOf('?'));
    // }
    // return str;

    const decodedUrl = decodeURIComponent(url);
    // console.log('truncateString decodedUrl: ' + decodedUrl);
    const questionMarkIndex = decodedUrl.indexOf('?');
    // console.log('truncateString questionMarkIndex: ' + questionMarkIndex);
    if (questionMarkIndex!== -1) {
        return decodedUrl.substring(0, questionMarkIndex);
    }
    return decodedUrl;
}