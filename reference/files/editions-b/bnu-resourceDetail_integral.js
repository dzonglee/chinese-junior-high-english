/* sky */
$(function () {
    //开始初始化，have return
    var resId = initMenu();

    $(".closeerrordirec").click(function () {
        $(".errordirec").hide();
    });

    //红心函数2【非测试】
    $('.left_con').on('click', '#isCollect', function () {
        var $this = $(this);
        var flag = $this.hasClass('select');
        //检查用户是否登录
        $.get(
            getBasePath() + "login/checkHasLogin", function (data) {
                if (data == "success") {
                    if ($this.hasClass('select')) {
                        deletBox("是否确定取消收藏？");
                    } else {
                        deletBox("是否要收藏？");
                    }
                    var id = $this.attr('data-id');//此处值仍未写入
                    //此处函数要将resId字段对应为data-id的值。
                    $('.yesbtn').click(function () {
                        $.post(getBasePath() + 'resource/saveMyCollect', {resId: resId}, function (data) {
                            if (data.status == "success") {
                                $(".deleteBox").remove();
                                if (flag) {
                                    $this.removeClass('select');
                                } else {
                                    $this.addClass('select');
                                }
                            }
                        });
                    });
                } else {
                    var redirect_url = window.location.href;
                    var r_url = getBasePath() + 'login/sendRedirectUrl';
                    $.get(
                        r_url, {'redirect_url': redirect_url}, function (data) {
                            // alert(2);
                            window.location.href = "login.html";
                        });
                }
            }
        )
    });

    //qq空间分享插件
    $(".qq_zone").on("click", function () {
        $(this).socialShare("qZone", {title: $(".eBook").text()});
        $.post(getBasePath() + "integral/share", function (data) {
            // alert(data.message);
        }, "json");
    });

    //微信
    $(".share_wx").on("click", function () {
        $(this).socialShare("weixinShare");
        $.post(getBasePath() + "integral/share", function (data) {
            // alert(data.message);
        }, "json");
    });
    //初始化回填函数
    function initMenu() {
        //
        var redirect_url = window.location.href;
        var r_url = getBasePath() + 'login/sendRedirectUrl';
        //处理登陆吗
        $.get(
            r_url, {'redirect_url': redirect_url}, function (data) {

            });
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substring(1,url.lastIndexOf("&"));
            var resIdStr = str.substring(0, str.indexOf("&"));
            var lastStr = str.substring(str.indexOf("&") + 1, str.length);
            var typeStr = lastStr.substring(0, lastStr.indexOf("&"));
            var contributeIdStr = lastStr.substring(lastStr.indexOf("&") + 1, str.length);
            var resId = resIdStr.substring(resIdStr.indexOf("=") + 1, str.length);
            var contributeId = contributeIdStr.substring(contributeIdStr.indexOf("=") + 1, str.length);
            var tp = url.substring(url.lastIndexOf("=") + 1, url.length);
            if(tp == "Ebook"){
              $(".title").text("电子课本");
            }else{
              $(".title").text("教师用书");
            }
            $("#isCollect").prepend('<span class="collect" data-id="'+ resId +'"></span>');
            var type = typeStr.substring(typeStr.indexOf("=") + 1, str.length);
            var baseUrl = getBasePath();
            var section_url = baseUrl+'resource/querySynResourceOne';
            if (type == "SYN"){
                section_url = baseUrl+'resource/querySynResourceOne';
            }else if(type == "SUB"){
                section_url = baseUrl+'resource/querySubjectIntroductionOne';
            }

            //扉页按钮
            $("#titlePage").html("<a target='_blank' href='titlePage.html?" + resIdStr + "'><h3>扉页等</h3></a>")

            //假如用户登录，回填红心收藏状态
            $.get(
                section_url,{'resId':resId}, function (data) {
                    if (data.status == "success") {
                        var mycheckjson = data.data;
                        var isCollect = mycheckjson.isCollect;
                    };
                    //红心
                    if(isCollect > 0){
                        $("#isCollect").addClass("select");
                    }
                });
            //回填中部图区（包括下面的资源介绍）
            var section_url = baseUrl + 'ebook/catalogList';
            // var section_url = 'mulu.json';

            //回填目录结构
            var parameter = {'resId':resId};//非测试数据

            //回填中部图区,标题（包括下面的资源介绍）
            $.post(//非测试数据
                section_url, {'resId': resId}, function (data) {

            // $.get(//测试代码开始
            //     section_url,  function (data) {//测试代码结束
                    if (data.status == "success") {
                        var edata = data.data[0];
                        var eimg = edata.picture;//回填主图
                        var tuijianSubjectId = edata.subjectId;//推荐目录一参
                        var tuijianSectionId = edata.sectionId;//推荐目录二参
                        var resourceTypeTwoLevelId = edata.resourceTypeTwoLevelId;
                        var versionId = edata.versionId;
                        //
                        var firstNum = eimg.substring(eimg.lastIndexOf("/") + 1, eimg.lastIndexOf("."));

                        //回填title书名
                        $(".eBook").html(edata.subjectName + "|" + edata.bookName);

                        //回填目录结构
                        var eBookItem = edata.catalogList;//非测试数据

                        for (var i = 0; i < eBookItem.length; i++) {
                            var result = '';
                            var deep = eBookItem[i].deep;
                            if(deep == 5){
                                result += '<li data-bookId="' + eBookItem[i].bookId + '" data-resId="' + resId + '" style="font-weight:bold;">' + eBookItem[i].cataName + '</li>';
                            }else {
                                result += '<li data-bookId="' + eBookItem[i].bookId + '" data-resId="' + resId + '" style="text-indent:20px;">' + eBookItem[i].cataName + '</li>';
                            }
                            $(".eBook_con").append(result);
                        };

                        $(".eBook_con").on("click","li",function () {
                            var $this = $(this);
                            var eBookId = $this.attr('data-bookId');
                            var resId = $this.attr('data-resId');
                            //此处我传递了两个参数，resId和bookid来定位
                            window.location.href = "eBookAndTeacher.html?resId=" + resId + "&bookId=" + eBookId + "&firstNum=" + firstNum + "&contributeId=" + contributeId;
                        })



                        //回填封面图
                        $(".wrap_pdf").html("<img id='wrap_pdf' src='" + eimg + "'></a>");

                        /*$(".lazy").css({"width":"50px","height":"50px","position":" absolute","top":"50%","left":"50%","margin-left":"-25px"});*/
                        $(".wrap_pdf img").LoadImage();


                        //回填右上角推荐列表
                        var recommend_url = baseUrl+'ebook/ebookDirectory';
                        //注意后传参，返回参进行过一次修改
                        $.post(
                            recommend_url,{'subjectId':tuijianSubjectId,'sectionId':tuijianSectionId,'resourceTypeTwoLevelId':resourceTypeTwoLevelId,'versionId':versionId}, function (data) {
                                if (data.status == "success") {
                                    var recommendList = data.ebookList;
                                    if( recommendList == "" && recommendList.length == 0) {
                                        $("#recBox").append("<img src=./images/noRese.png>");
                                    }else {
                                        for (var a = 0; a < recommendList.length; a++) {
                                            var eid = recommendList[a].id;
                                            var contributeId = recommendList[a].contributeId;
                                            var bookName = recommendList[a].bookName;
                                            var subjectName = recommendList[a].subjectName;
                                            if(bookName != null && bookName != "" && bookName != undefined && subjectName != null && subjectName != "" && subjectName != undefined) {
                                                detail_url = "resourceDetail_eBookAndTeacher.html?resId=" + eid + "&type=Other" + "&contributeId=" + contributeId +"&tp="+tp;
                                                $("#recBox").append("<a href='" + detail_url + "' class='eBook_res'>" + subjectName + bookName + "</a>");
                                            }
                                        }
                                    }
                                } else {
                                    // alert("页面加载失败!");
                                }
                            }
                        );
                    } else {
                        alert("页面加载失败!");
                    }
                }
            )

            return resId;
        }
    }
});
//是否确定弹窗

function deletBox(message) {
    var alertstr = '<div class="mask deleteBox" style="display: block;"><div class="alertbox">' +
        '<span class="closedeleteBox"></span><h1>提示</h1><p>' + message + '</p><div class="closedeleteBox nobtn">取消</div><button class="yesbtn">确定</button></div></div>';
    $("body").append(alertstr);
    $(".closedeleteBox").click(function () {
        $(".deleteBox").remove();
    });
    $(".yesbtn").click(function () {
        $(".deleteBox").remove();
    })
}
