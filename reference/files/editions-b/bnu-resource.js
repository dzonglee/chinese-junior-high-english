$(function () {
    //整体dom初始化
    initMenu();
    $(".btn_change").click(function () {
        $(".classification").hide();
        $(this).parent().next().show();
    });
    $("#class_section").on("click", "li", function () {
        categoryCodeNew = "";
        getSectionHidden(this);
        $(".choseBrdr").html("");
        $(this).parents("#class_section").hide();
    });

    $("#class_subject").on("click", "li", function () {
        categoryCodeNew = "";
        getSubjectHidden(this);
        $(".choseBrdr").html("");
        $(this).parents("#class_subject").hide();
    });
    $(".slct").on("click", "span", function () {
        $(this).siblings().removeClass("selected").end().addClass("selected");
    });

    $("#category").on("click", "span", function () {
        $("#home").show();
        $("#dateTeacher").hide();
        $("#dateAuthor").hide();
        $(".zhishidian").show();
        $(".nianfen").show();
        $(".geshi").show();
        $(".selectBrdr").show();
        //teaching_introduction author_introduction
        categoryNew = this.getAttribute("data-value");
        //var dataValue = this.getAttribute("data-value");
        if (categoryNew == 'teaching_introduction'){
            dateTeacher();
        } else if(categoryNew == 'author_introduction'){
            dateAuthor();
        } else {
            search_page(1, 6);
        }
    });
    $("#format").on("click", "span", function () {
        formatNew = this.getAttribute("data-value");
        search_page(1, 6);
    });
    $("#yearmonth").on("click", "span", function () {
        yearNew = this.getAttribute("data-value");
        if (categoryNew == 'teaching_introduction'){
            dateTeacher();
        } else if(categoryNew == 'author_introduction'){
            dateAuthor();
        }else {
            search_page(1, 6);
        }
    });
    //默认选中价格不限
    $("#price_all").attr("class", "selectz");
    $("#price_all").click(function () {
        $("#price_all").attr("class", "selectz");
        $("#price_free").attr("class", null);
        $("#price_cost").attr("class", null);
        priceNew = "";
        search_page(1, 6);
    });
    $("#price_free").click(function () {
        $("#price_free").attr("class", "selectz");
        $("#price_all").attr("class", null);
        $("#price_cost").attr("class", null);
        priceNew = "0";
        search_page(1, 6);
    });
    $("#price_cost").click(function () {
        $("#price_cost").attr("class", "selectz");
        $("#price_all").attr("class", null);
        $("#price_free").attr("class", null);
        priceNew = "1";
        search_page(1, 6);
    });
    //默认按照最新时间排序
    $("#time").attr("class", "selectz");
    $("#view").click(function () {
        $("#view").attr("class", "selectz");
        $("#time").attr("class", null);
        $("#downclick").attr("class", null);
        sortTypeNew = "view";
        search_page(1, 6);
    });
    $("#time").click(function () {
        $("#time").attr("class", "selectz");
        $("#view").attr("class", null);
        $("#downclick").attr("class", null);
        sortTypeNew = "time";
        search_page(1, 6);
    });
    $("#downclick").click(function () {
        $("#downclick").attr("class", "selectz");
        $("#time").attr("class", null);
        $("#view").attr("class", null);
        sortTypeNew = "downclick";
        search_page(1, 6);
    });

    $('#datalist').on('click', '.favorite', function () {
        var $this = $(this);
        var flag = $this.hasClass('favorite_F');
        //检查用户是否登录
        $.get(
            getBasePath() + "login/checkHasLogin", function (data) {
                if (data == "success") {
                    if ($this.hasClass('favorite_F')) {
                        deletBox("是否确定取消收藏？");
                    } else {
                        deletBox("是否要收藏？");
                    }
                    var id = $this.attr('data-id');
                    $('.yesbtn').click(function () {
                        $.post(getBasePath() + 'resource/saveMyCollect', {resId: id}, function (data) {
                            if (data.status == "success") {
                                $(".deleteBox").remove();
                                if (flag) {
                                    $this.removeClass('favorite_F');
                                } else {
                                    $this.addClass('favorite_F');
                                }
                            }
                        });
                    });
                } else {
                    var redirect_url = window.location.href;
                    var r_url = getBasePath() + '/login/sendRedirectUrl';
                    $.get(
                        r_url, {'redirect_url': redirect_url}, function (data) {
                            window.location.href = "login.html";
                        });
                }
            }
        )
    });
});
//树参数设置
var settingCatalog = {
    view: {
        selectedMulti: false,
        showIcon: false,
        fontCss: {'font-size': '16px'}
        // fontCss: getFontCss1
    },
    edit: {
        enable: false,
        editNameSelectAll: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: zTreeOnClick
    }
};

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
//树点击事件
function zTreeOnClick(event, treeId, treeNode) {
    if(treeNode.level==1){
        if(treeNode.level4!=null && treeNode.level4!="" && treeNode.level4 !=undefined){
            categoryCodeNew = treeNode.level4;
        }
    }else {
        categoryCodeNew = treeNode.id;
    }
    search_page(1, 6);
}
//树的定义函数
function initTree(id, url, isetting, param) {
  $.ajax({
    type: "post",
    url: url,
    dataType: "json",
    data: param,
    async: false,
    success: function (rtnData) {
      if (rtnData.status == "success") {
        var ebooklist = rtnData.data;
        if (isetting != null) {
          var treeObj = $.fn.zTree.init($("#" + id), isetting, ebooklist);
        } else {
          var treeObj = $.fn.zTree.init($("#" + id), setting, ebooklist);
        }
        $.fn.zTree.getZTreeObj("tree");
        var rootNode = treeObj.getNodeByTId('1'),rootNode2 = treeObj.getNodeByTId('2');
        if(rootNode.name!="无") {
          if(rootNode2.name!="无"){
            treeObj.expandNode(rootNode,true,false);
          }else{
            treeObj.removeNode(treeObj.getNodeByTId('1'));
          }
        }else {
          treeObj.removeNode(treeObj.getNodeByTId('1'));
        }
      } else {
        if (rtnData.message != null) {
          alert(rtnData.message);
        } else {
          alert("加载失败");
        }
      }
    }
  });
}

var sectionNewId = "";
var subjectNewId = "";
var categoryNew = "";
var formatNew = "";
var yearNew = "";
var priceNew = "";
var sortTypeNew = "time";
var knowledgeCodeNew = "";
var categoryCodeNew = "";
var hasDeep = false;
var knowledgelv1 = "";
var knowledgelv2 = "";
var knowledgelv3 = "";
var knowledgelv4 = "";
var g_val = "1";
var max_page_num = "1";
//整个dom结构初始化函数
function initMenu() {
    $.ajaxSettings.async = false;
    var baseUrl = getBasePath();

    var format_url = baseUrl + 'resource/queryFormat';
    //渲染格式
    $.get(
        format_url, function (data) {
            if (data.status == "success") {
                var mycheckjson = data.data;
                for (var a = 0; a < mycheckjson.length; a++) {
                    $("#format").append('<span data-value=\'' + mycheckjson[a].id + '\' data-name=\'' + mycheckjson[a].name + '\' >' + mycheckjson[a].name + '</span>');
                }
            } else {
                alertwarn("页面加载失败！", "", true);
                ;
            }
        }
    )
    //渲染年份
    init_year();

    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var sectionIdStr = str.substring(0, str.indexOf("&"));
        var subjectIdSStr = str.substring(str.indexOf("&") + 1, str.length);
        sectionNewId = sectionIdStr.substring(sectionIdStr.indexOf("=") + 1, str.length);
        subjectNewId = subjectIdSStr.substring(subjectIdSStr.indexOf("=") + 1, str.length);
        //$("#sectionId").val(sectionNewId);
        //$("#subjectId").val(subjectNewId);
        $("#SYN").attr("href", "");
        $("#SYN").attr("href", "resource.html?sectionNewId=" + sectionNewId + "&subjectNewId=" + subjectNewId);
        $("#SUB").attr("href", "");
        $("#SUB").attr("href", "resourceSubject.html?sectionNewId=" + sectionNewId + "&subjectNewId=" + subjectNewId);
        $("#TINT").attr("href", "");
        $("#TINT").attr("href", "resourceAuthor.html?sectionNewId=" + sectionNewId + "&subjectNewId=" + subjectNewId);
        $("#AUT").attr("href", "");
        $("#AUT").attr("href", "resourceTeaching.html?sectionNewId=" + sectionNewId + "&subjectNewId=" + subjectNewId);

        if (sectionNewId == "difang" || sectionNewId == "xueqian") {
            $("#SYN").html("备课资源");
        } else {
            $("#SYN").html("同步资源");
        }
    }


    var section_url = baseUrl + 'resource/queryStudySection';

    //渲染年级分类
    $.get(
        section_url, function (data) {
            if (data.status == "success") {
                var mycheckjson = data.data;
                for (var a = 0; a < mycheckjson.length; a++) {
                    $("#section").append('<li data-value=\'' + mycheckjson[a].code + '\' data-name=\'' + mycheckjson[a].name + '\' >' + mycheckjson[a].name + '</li>');
                    if (sectionNewId != "" && mycheckjson[a].code == sectionNewId) {
                        $("#section_value").html(mycheckjson[a].name);
                    }
                }
                if (sectionNewId == "") {
                    sectionNewId = mycheckjson[0].code;

                    $("#section_value").html(mycheckjson[0].name);
                }
                //初始化知识点和树【渲染知识点】
                if ($("#sectionId").val() == null || $("#sectionId").val() == "") {
                    var baseUrl = getBasePath();
                    var subject_url = baseUrl + 'resource/querySubjetBySection';
                    var sectionId = sectionNewId;
                    $.get(
                        subject_url, {sectionId: sectionId}, function (data) {
                            if (data.status == "success") {
                                var mycheckjson = data.data;
                                for (var a = 0; a < mycheckjson.length; a++) {
                                    $("#subject").append('<li data-value=\'' + mycheckjson[a].code + '\' data-name=\'' + mycheckjson[a].name + '\' >' + mycheckjson[a].name + '</li>');
                                    if (subjectNewId != "" && mycheckjson[a].code == subjectNewId) {
                                        var str = mycheckjson[a].name;
                                        var subjectName = str.substring(0, str.indexOf('('));
                                        var subName;
                                        if (str.indexOf('(') > 0 || (str.length>7 && str.indexOf('与')>0) || str.length>7) {
                                            if(subjectName!=null &&subjectName!="" && subjectName!=undefined){
                                                subName = str.substring(str.indexOf('('),str.length);
                                            }else {
                                                subjectName = str.substring(0, str.indexOf('与'));
                                                if (subjectName != null && subjectName != "" && subjectName != undefined) {
                                                    subName = str.substring(str.indexOf('与'), str.length);
                                                }else{
                                                    subjectName = str.substring(0,4);
                                                    if(subjectName != null && subjectName != "" && subjectName != undefined && str.length >= 7){
                                                        subName = str.substring(4, str.length);
                                                    }
                                                }
                                            }
                                            $("#subject_value").html("<p>" + subjectName + "</p>" + subName);
                                            $("#subject_value").css({"line-height": "20px", "marginTop": "6px"});
                                        } else {
                                            $("#subject_value").html(mycheckjson[a].name);
                                            $("#subject_value").css({"line-height": "52px", "marginTop": "0px"});
                                        }
                                    }
                                }
                                if (subjectNewId == "") {
                                    subjectNewId = mycheckjson[0].code;
                                    $("#subjectId").val(subjectNewId);
                                    var str = mycheckjson[0].name;
                                    if (str.length >= 7) {
                                        $("#subject_value").css({"line-height": "20px", "marginTop": "6px"});
                                    } else {
                                        $("#subject_value").css({"line-height": "52px", "marginTop": "0px"});
                                    }
                                    $("#subject_value").html(mycheckjson[0].name);
                                }
                                //$("#subject_value_hidden").val(mycheckjson[0].code);
                                search_page(1, 6);

                                var baseUrl = getBasePath();
                                var tree_url = baseUrl + 'resource/queryTree';
                                var param = {subjectId: subjectNewId};
                                //初始化菜单树
                                initTree("tree", tree_url, settingCatalog, param);
                                var lv1_url = getBasePath() + 'resource/queryKnowledgeLv1';
                                if (subjectNewId != "") {
                                    getKnowledge(lv1_url,subjectNewId);
                                }
                            } else {
                                alertwarn("页面加载失败！", "", true);
                                ;
                            }
                        }
                    )
                }
                $("#sectionId").val(sectionNewId);
                $("#subjectId").val(subjectNewId);
            }
        }
    )

    var queryCategory_url = baseUrl + 'resource/queryCategory';
    getQueryCategory(queryCategory_url,sectionNewId,subjectNewId);
    $.ajaxSettings.async = true;

}
// 展开下级知识点
function initChildLevel(url,id,deep,name){
    var full_url = url + (Number(deep) + 1);
    if(name == '不限'){
        if(deep == $(".choseBrdr").children('strong:last-child').data("deep")) {
            $(".choseBrdr").children('strong:last-child').remove();
        }
         $(".choseBrdr").append('<strong data-value=\'' + id + '\' data-deep=\'' + deep + '\'>' + name + '<em></em></strong>');
        return;
    }
    if(deep < 4){
        $.ajax({
            type: "get",
            data: {id: id},
            dataType: "json",
            url: full_url
        }).done(function(data){
            if(data.status == "success"){
                var mycheckjson = data.data;
                if($(".choseBrdr").children('strong:last-child').html() && $(".choseBrdr").children('strong:last-child').html().indexOf('不限') != -1){
                    $(".choseBrdr").children('strong:last-child').remove();
                }
                if(mycheckjson.length == 0){
                    // 无下一级节点
                    if($(".choseBrdr").children('strong:last-child').data("deep") == deep){
                        $(".choseBrdr").children('strong:last-child').remove();
                    }
                    $(".choseBrdr").append('<strong data-value=\'' + id + '\' data-deep=\'' + deep + '\'>' + name + '<em></em></strong>');
                    return;
                }else if(mycheckjson.length > 0){
                    // 删除以后再添加同级节点
                    if($(".choseBrdr").children('strong:last-child').data("deep") == deep){
                        $(".choseBrdr").children('strong:last-child').remove();
                    }
                    // 有下一级节点
                    $(".choseBrdr").append('<strong data-value=\'' + id + '\' data-deep=\'' + deep + '\'>' + name + '<em></em></strong>');
                    var klStr = "";
                    klStr += '<p data-pdeep="'+ mycheckjson[0].deep +'"><span data-value=\'' + '' + '\' data-name=\'' + '不限' + '\' deep=\'' + mycheckjson[0].deep + '\'>' + '不限' + '<em></em></span>';
                    for (var a = 0; a < mycheckjson.length; a++) {
                        klStr += '<span data-value=\'' + mycheckjson[a].id + '\' data-name=\'' + mycheckjson[a].name + '\' deep=\'' + mycheckjson[a].deep + '\'>' + mycheckjson[a].name + '<em></em></span>';
                    }
                    klStr += '</p>';
                    var children = $("#knowledge").children('p');
                    for(var i=0; i<children.length; i++){
                        if(children.eq(i).data('pdeep') >=  mycheckjson[0].deep){
                            children.eq(i).remove();
                        }else{
                            children.eq(i).hide();
                        }
                    }
                    $("#knowledge").append(klStr);
                }
            }
        }).error(function(data){
            alertwarn("页面加载失败！", "", true);
        });
    }else if(deep == 4){

        if($(".choseBrdr").children('strong:last-child').data("deep") == deep || $(".choseBrdr").children('strong:last-child').html().indexOf('不限') != -1){
            $(".choseBrdr").children('strong:last-child').remove();
        }
        $(".choseBrdr").append('<strong data-value=\'' + id + '\' data-deep=\'' + deep + '\'>' + name + '<em></em></strong>');
    }

}
// 删除下级知识点
function deleteChildLevel(url,id,deep){
    var deep = Number(deep);
    var children = $(".choseBrdr").children('strong');
    for(var i=0; i<children.length; i++){
        if(children.eq(i).data('deep') >=  deep){
            children.eq(i).remove();
        }
    }
    var klist = $("#knowledge").children('p');
    for(var i=0; i<klist.length; i++){
        if(deep == 1){
            klist.eq(0).show().siblings().hide();
            klist.eq(0).children("span").eq(0).addClass("selected").siblings().removeClass("selected");
        }else if(klist.eq(i).data('pdeep') >=  deep){
            klist.eq(i).remove();
        }else if(klist.eq(i).data('pdeep') == deep-1){
            klist.eq(i).show();
        }
    }
}
//搜索页码
function search_page(currentPage, pageSize) {
    $(".selectBrdr").show();
    $(".geshi").show();
    $(".zhishidian").show();
    $(".nianfen").show();
    $("#home").show();
    $("#dateTeacher").hide();
    $("#dateAuthor").hide();

    g_val = $("#go_value").val();
    if (typeof(currentPage) == "undefined") {
        currentPage = $("#go_value").val();
    } else if (currentPage != g_val && typeof(g_val) != "undefined" && g_val != "") {
        if (g_val == "0" || !/^[0-9]+$/.test(g_val)) {
            currentPage = 1;
            $("#go_value").val(currentPage);
        } else {
            currentPage = g_val;
        }
    }
    if (currentPage > max_page_num) {
        currentPage = max_page_num;
    }
    var baseUrl = getBasePath();
    var resource_url = baseUrl + 'resource/querySynResource';
    var sectionId = sectionNewId;
    var subjectId = subjectNewId;
    var resourceTypeTwoLevelId = categoryNew;
    var resourceTypeOneLevelId = "";
    var resourceFormatId = formatNew;
    var knowledgeCode = knowledgeCodeNew;
    var yearMonth = yearNew;
    var sortType = sortTypeNew;
    var price = priceNew;
    var pageNo = currentPage;
    var pageSize = pageSize;
    var categoryCode = categoryCodeNew;
    $.get(
        resource_url, {
            "categoryCode": categoryCode,
            "sectionId": sectionId,
            "subjectId": subjectId,
            "resourceTypeTwoLevelId": resourceTypeTwoLevelId,
            "resourceTypeOneLevelId": resourceTypeOneLevelId,
            "resourceFormatId": resourceFormatId,
            "knowledgeCode": knowledgeCode,
            "yearMonth": yearMonth,
            "sortType": sortType,
            "price": price,
            "pageNo": pageNo,
            "pageSize": pageSize
        }, function (data) {
            if (data.status == "success") {
                $("#paper").show();
                $("#datalist").empty();
                var mycheckjson = data.data;
                for (var a = 0; a < mycheckjson.length; a++) {
                    var resId = mycheckjson[a].id;
                    var typevalue = mycheckjson[a].typevalue;
                    var typeid = mycheckjson[a].typeid;
                    var title = mycheckjson[a].title;
                    // var content = subStringContent(mycheckjson[a].content);
                    var content = mycheckjson[a].content;
                    // alert(content.length);
                    var cover = mycheckjson[a].coverPath;
                    var isFree = mycheckjson[a].isFree;
                    var cost = mycheckjson[a].cost;
                    var user_img = mycheckjson[a].img;
                    var user_name = mycheckjson[a].username;
                    // var user_name = mycheckjson[a].author;
                    var time = mycheckjson[a].createDate;
                    var likeCount = mycheckjson[a].likeCount;
                    var views = mycheckjson[a].views;
                    var downclick = mycheckjson[a].downclick;
                    var isCollect = mycheckjson[a].isCollect;
                    var resourceTypeOneLevelValue = mycheckjson[a].resourceTypeOneLevelValue;
                    var resourceTypeTwoLevelValue = mycheckjson[a].resourceTypeTwoLevelValue;
                    var resourceTypeTwoLevelId = mycheckjson[a].resourceTypeTwoLevelId;
                    var origin = mycheckjson[a].origin;
                    var pdfPath = mycheckjson[a].pdfPath;
                    var swfPath = mycheckjson[a].swfPath;
                    var contributeId = mycheckjson[a].contributeId;
                    var type_img = "";
                    var collect_css = "";
                    var free_css = "";
                    var detail_url = "";
                    if (typeid == 'Document') {
                        type_img = 'images/pdf1.png';
                    } else if (typeid == 'Image') {
                        type_img = 'images/img1.png';
                    } else if (typeid == 'Audio') {
                        type_img = 'images/audio1.png';
                    } else if (typeid == 'Video') {
                        type_img = 'images/video1.png';
                    } else if (typeid == 'Cartoon') {
                        type_img = 'images/video1.png';
                    } else {
                        type_img = 'images/other.png';
                    }
                    if (isCollect == '0') {
                        collect_css = 'favorite';
                    } else {
                        collect_css = 'favorite favorite_F';
                    }
                    if (isFree == '0') {
                        free_css = '';
                        cost = '免费';
                        detail_url = "resourceDetail_integral.html?resId=" + resId + "&type=SYN";
                    } else {
                        free_css = 'icon_free';
                        detail_url = "resourceDetail_integral.html?resId=" + resId + "&type=SYN";
                    }
                  var reg = new RegExp("coverpage","g");
                  if(title.indexOf("coverpage") >= 0 ){
                    title = title.replace(reg,"");
                  }
                    if(title.length >= 30){
                        var strtitle = title.substring(0, 30).trim().replace(/[\r\n]/g, "") + "...";
                    }else{
                        var strtitle = title;
                    }
                    if(content==null || content==undefined){
                        content="";
                    }

                    if(content.indexOf("<object") > -1){
                        content = "";
                    }else if(content.indexOf("style=") > -1){
                        content = "";
                    }

                    if (resourceTypeTwoLevelId != "E-textbook" && resourceTypeTwoLevelId != "TeacherBook" ) {
                        if(origin != 'OD'){
                            $("#datalist").append('<li><dl><dt class="top"><img src=\'' + type_img + '\' alt=""><span class="format">' + resourceTypeTwoLevelValue + '</span></dt><dd class="title" title="'+title+'"><a target= "_blank" href=\'' + detail_url + '\' >' + strtitle + '</a></dd><dd class="description"><a target= "_blank" href=\'' + detail_url + '\' ><img src=\'' + cover + '\' alt=""><span class="mask">' + removeHTMLTag(content) + '</span></a></dd><dd class="free"><span class=\'' + free_css + '\'></span><span>' + cost + '</span></dd><dd class="media"><div class="photo"><img src=\'' + user_img + '\' alt=""></div><div class="media_right"><div class="info"><span class="author">' + "" + '</span><span class="date">' + time + '</span></div><div class="feedback"><span class="zan">' + likeCount + '</span><span class="see">' + views + '</span><span class="download">' + downclick + '</span></div></div></dd></dd></dl></li>');
                        }else{
                            $("#datalist").append('<li><dl><dt class="top"><img src=\'' + type_img + '\' alt=""><span class="format">' + resourceTypeTwoLevelValue + '</span></dt><dd class="title" title="'+title+'"><a target= "_blank" href=\'' + detail_url + '\' >' + strtitle + '</a></dd><dd class="description"><a target= "_blank" href=\'' + detail_url + '\' ><img src=\'' + cover + '\' alt=""></a></dd><dd class="free"><span class=\'' + free_css + '\'></span><span>' + cost + '</span></dd><dd class="media"><div class="photo"><img src=\'' + user_img + '\' alt=""></div><div class="media_right"><div class="info"><span class="author">' + "" + '</span><span class="date">' + time + '</span></div><div class="feedback"><span class="zan">' + likeCount + '</span><span class="see">' + views + '</span><span class="download">' + downclick + '</span></div></div></dd></dd></dl></li>');
                        }
                    }
                    else {
                        if(resourceTypeTwoLevelId == "E-textbook"){
                          detail_url = "resourceDetail_eBookAndTeacher.html?resId=" + resId + "&type=SYN" + "&contributeId=" + contributeId + "&tp=Ebook";
                        }else{
                          detail_url = "resourceDetail_eBookAndTeacher.html?resId=" + resId + "&type=SYN" + "&contributeId=" + contributeId + "&tp=Tbook";
                        }
                        $("#datalist").append('<li><dl><dt class="top"><img src=\'' + type_img + '\' alt=""><span class="format">' + resourceTypeTwoLevelValue + '</span></dt><dd class="title" title="'+title+'"><a target= "_blank" href=\'' + detail_url + '\' >' + strtitle + '</a></dd><dd class=\'ebigImg\'><a target= "_blank" href=\'' + detail_url + '\' ><img src=\''+cover+'\' alt=""></a></dd></dl></li>');
                    }
                }
                $(".ebigImg img").LoadImage();
                //$("#time").attr("class", "selectz");

                subStringContent();
                if (mycheckjson.length > 0) {
                    //添加分页栏
                    var str2 = "";
                    var page = data.pageConfig;         //分页信息
                    var p = data.pageConfig.currentPage;  //得到当前页码
                    max_page_num = page.totalPage;
                    if (p != 1) {
                        str2 += "<a href='javascript:void(0)' class='pageprev' onclick='search_page(" + (p - 1) + ",6);'></a>";
                    } else {
                        str2 += "<a href='javascript:void(0)' class='pageprev'></a>";
                    }
                    if (page.totalPage <= 9) {
                        for (var i = 1; i <= page.totalPage; i++) {
                            if (i == p) {
                                str2 += "<a href='javascript:void(0)' class='cur' onclick='search_page(" + i + ",6);'>" + i + "</a>";
                            } else {
                                str2 += "<a href='javascript:void(0)' onclick='search_page(" + i + ",6);'>" + i + "</a>";
                            }
                        }
                    } else {
                        if (p - 4 > 0) {
                            if (p + 4 <= page.totalPage) {
                                for (var i = p - 4; i <= p + 4; i++) {
                                    if (i == p) {
                                        str2 += "<a href='javascript:void(0)' class='cur' onclick='search_page(" + i + ",6);'>" + i + "</a>";
                                    } else {
                                        str2 += "<a href='javascript:void(0)' onclick='search_page(" + i + ",6);'>" + i + "</a>";
                                    }
                                }
                            } else {
                                for (var i = p - 4; i <= page.totalPage; i++) {
                                    if (i == p) {
                                        str2 += "<a href='javascript:void(0)' class='cur' onclick='search_page(" + i + ",6);'>" + i + "</a>";
                                    } else {
                                        str2 += "<a href='javascript:void(0)' onclick='search_page(" + i + ",6);'>" + i + "</a>";
                                    }
                                }
                            }
                        } else {
                            for (var i = 1; i <= 9; i++) {
                                if (i == p) {
                                    str2 += "<a href='javascript:void(0)' class='cur' onclick='search_page(" + i + ",6);'>" + i + "</a>";

                                } else {
                                    str2 += "<a href='javascript:void(0)' onclick='search_page(" + i + ",6);'>" + i + "</a>";
                                }
                            }
                        }
                    }
                    if (p != page.totalPage) {
                        str2 += "<a href='javascript:void(0)' class='pagenext' onclick='search_page(" + (p + 1) + ",6);'></a>";
                    } else {
                        str2 += "<a href='javascript:void(0)' class='pagenext'></a>";
                    }
                    str2 += "<input id='go_value' type='text'>";
                    g_val = $("#go_value").val();
                    if (g_val == "") {
                        g_val = currentPage;
                    }
                    str2 += "<a href='javascript:void(0)' onclick='search_page(" + (g_val) + ",6);' class='go'>GO</a>";
                    str2 += "<a href='javascript:void(0)'>共 " + page.totalPage + " 页</a>";
                    $("#pageInfo").html("");
                    $("#pageInfo").append(str2);
                } else {
                    // $("#home").empty();
                    $("#datalist").append('<div class="imgCtrl"><img id="userImg" src="images/no_resource.png"></div>');
                    $("#paper").hide();
                }
            } else {
                search_page(1, 6);
            }
        }
    )
}

//资源内容超过100字显示。。。
function subStringContent() {
    $("#datalist").find(".mask").each(function (a, b) {
        // alert(a);
        // alert(b.innerText);
        if (b.innerText != null && b.innerText != "" && b.innerText !== undefined) {
            var text = b.innerText.trim().replace(/[\r\n]/g, "");
            if( b.innerText.length > 80) {
                b.innerText = text.substring(0, 80).trim() + "...";
            }else{
                b.innerText = text;
            }
        }else{
            b.innerText = "";
        }
    })
    /*  if (text != null && text != "" && text.length > 80) {
     $(".description").text($(".description").text().substring(0, 80) + "...");
     }*/
}
//学段
function getSectionHidden(obj) {
    $.ajaxSettings.async = false;
    //加上这行就默认选中不限了
    categoryNew = "";
    $("#section_value").html(obj.getAttribute("data-name"));
    $("#sectionId").val(obj.getAttribute("data-value"));
    $("#dateTeacher").hide();
    $("#dateAuthor").hide();
    // var baseUrl = getCtx();
    var baseUrl = getBasePath();
    var subject_url = baseUrl + 'resource/querySubjetBySection';
    var sectionId = $("#sectionId").val();
    sectionNewId = sectionId;
    if (sectionNewId == "difang" || sectionNewId == "xueqian") {
        $("#SYN").html("备课资源");
    } else {
        $("#SYN").html("同步资源");
    }
    $.get(
        subject_url, {sectionId: sectionId}, function (data) {
            if (data.status == "success") {
                $("#subject").empty();
                var mycheckjson = data.data;
                for (var a = 0; a < mycheckjson.length; a++) {
                    $("#subject").append('<li data-value=\'' + mycheckjson[a].code + '\' data-name=\'' + mycheckjson[a].name + '\' >' + mycheckjson[a].name + '</li>');
                    if (a == 0) {
                        subjectNewId = mycheckjson[a].code;
                        $("#subjectId").val(subjectNewId);
                        var str = mycheckjson[a].name;
                        if (str.length >= 7) {
                            $("#subject_value").css({"line-height": "20px", "marginTop": "6px"});
                        } else {
                            $("#subject_value").css({"line-height": "52px", "marginTop": "0px"});
                        }
                        if (str.length >= 7 && str.indexOf('与')>0) {
                            var subjectName = str.substring(0, str.indexOf('与'));
                            var subName;
                            if (subjectName != null && subjectName != "" && subjectName != undefined) {
                                subName = str.substring(str.indexOf('与'), str.length);
                            }
                            $("#subject_value").html("<p>" + subjectName + "</p>" + subName);
                        }else {
                            $("#subject_value").html(mycheckjson[a].name);
                        }
                        $("#subject_value_hidden").val(mycheckjson[0].code);
                        // search_page(1, 6);
                        $("#SYN").attr("href", "");
                        $("#SYN").attr("href", "resource.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
                        $("#SUB").attr("href", "");
                        $("#SUB").attr("href", "resourceSubject.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
                        $("#TINT").attr("href", "");
                        $("#TINT").attr("href", "resourceAuthor.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
                        $("#AUT").attr("href", "");
                        $("#AUT").attr("href", "resourceTeaching.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
                    }
                }
                knowledgeCodeNew = '';
                /*if (categoryNew != ''){
                    if (categoryNew == 'teaching_introduction'){
                        dateTeacher();
                    } else if(categoryNew == 'author_introduction'){
                        dateAuthor();
                    } else {
                        search_page(1, 6);
                    }
                }else {
                    search_page(1, 6);
                }*/
                var tree_url = baseUrl + 'resource/queryTree';
                var subject_value = $("#subject_value_hidden").val();
                var subject_value_suffix;
                if(subject_value!=null &&subject_value!="" && subject_value!=undefined){
                    subject_value_suffix = subject_value.substring(subject_value.indexOf("-")+1);
                }
                var subject_value_hidden = $("#sectionId").val()+"-"+subject_value_suffix;
                var param = {
                    subjectId: subject_value_hidden
                };
                //初始化菜单树
                initTree("tree", tree_url, settingCatalog, param);
                var lv1_url = getBasePath() + 'resource/queryKnowledgeLv1';
                getKnowledge(lv1_url,subjectNewId);

                var queryCategory_url = getBasePath() +'resource/queryCategory';
                getQueryCategory(queryCategory_url,sectionNewId,subjectNewId);
                if (categoryNew != ''){
                    if (categoryNew == 'teaching_introduction'){
                        dateTeacher();
                    } else if(categoryNew == 'author_introduction'){
                        dateAuthor();
                    } else {
                        search_page(1, 6);
                    }
                }else {
                    search_page(1, 6);
                }
            } else {
                // alertwarn("页面加载失败！", "", true);
                ;
            }
        }
    )
    $.ajaxSettings.async = true;
}
// 类别
function getQueryCategory(queryCategory_url,sectionNewId,subjectNewId) {
   /* $("#category").children('span').remove();*/
    $('#category').empty();
    $("#category").append("<span class='selected' data-value=''>不限</span>");
    $.get(
        queryCategory_url, {"sectionId": sectionNewId, "subjectId": subjectNewId,"resourceType":"SYN"},function (data) {
            if (data.status == "success") {
                //alert(categoryNew);
                var mycheckjson = data.data;
                if(mycheckjson.length == 0){
                    $("#category").append('该学段学科下暂无知识点');
                    return;
                }
                for (var a = 0; a < mycheckjson.length; a++) {
                    if(mycheckjson[a] != null){
                        /*if (categoryNew != '' && categoryNew == mycheckjson[a].id){
                            $("#category").append('<span class="selected" data-value=\'' + mycheckjson[a].id + '\' data-name=\'' + mycheckjson[a].name + '\' >' + mycheckjson[a].name + '</span>');
                        }else {
                            $("#category").append('<span data-value=\'' + mycheckjson[a].id + '\' data-name=\'' + mycheckjson[a].name + '\' >' + mycheckjson[a].name + '</span>');
                        }*/
                        $("#category").append('<span data-value=\'' + mycheckjson[a].id + '\' data-name=\'' + mycheckjson[a].name + '\' >' + mycheckjson[a].name + '</span>');
                    }
                }
                //$("#category").append("<span onclick='dateTeacher()'>教材介绍</span>");
                //$("#category").append("<span onclick='dateAuthor()'>作者介绍</span>");
                if (data.hasTeachIntroduction){
                    $("#category").append("<span data-value='teaching_introduction' data-name='教材介绍'>教材介绍</span>");
                }
                if (data.hasAuthorIntroduction){
                    $("#category").append("<span data-value='author_introduction' data-name='作者介绍'>作者介绍</span>");
                }
                if (categoryNew != ''){
                    var categoryArr = $("#category").children();
                    for (var i = 0; i < categoryArr.length; i++) {
                        var item = categoryArr[i];
                        if (item.getAttribute("data-value") == categoryNew){
                            item.className = "selected";
                        }else {
                            item.className = "";
                        }
                    }
                    var selectedCount = $("#category").children('span.selected').length;
                    if (selectedCount == 0){
                        $("#category").children()[0].className = 'selected';
                        categoryNew = "";
                    }
                }
            } else {
                /*alert("页面加载失败!");*/
                alertwarn("页面加载失败！", "", true);
            }
        }
    )
}



function init_year(){
    var yearmonth_url = getBasePath()+'resource/queryYear';
    $.get(
        yearmonth_url,{type:'TINT'}, function (data) {
            if (data.status == "success") {
                var mycheckjson = data.data;
                for (var a = 0; a < mycheckjson.length; a++) {
                    if(mycheckjson[a] != null){
                        $("#yearmonth").append('<span data-value=\'' + mycheckjson[a].year_value + '\' data-name=\'' + mycheckjson[a].year_value + '\' >' + mycheckjson[a].year + '</span>');
                    }
                }
            } else {
                alert("页面加载失败!");
            }
        }
    )
}
// 教材介绍
function dateTeacher() {
    //$('#yearmonth').empty();
    /*$('#yearmonth').append('<span class="selected">不限</span>');*/
    //init_year();
    $(".selectBrdr").hide();
    search_page_teach(1,9);
    $(".geshi").hide();
    $(".zhishidian").hide();
    $(".nianfen").show();
    $("#dateTeacher").show();
    $("#dateAuthor").hide();
    $("#home").hide();

}

// 作者介绍
function dateAuthor() {
    $(".selectBrdr").hide();
    search_page_author(1,9);
    $(".geshi").hide();
    $(".zhishidian").hide();
    $(".nianfen").hide();
    $("#dateAuthor").show();
    $("#dateTeacher").hide();
    $("#home").hide();
}
// 显示知识点行
function getKnowledge(lv1_url,subjectNewId) {
        $.get(
            lv1_url, {"subjectId": subjectNewId}, function (data) {
                var baseUrl = getBasePath();
                if (data.status == "success") {
                    var mycheckjson = data.data;
                    $("#knowledge").empty();
                    if(mycheckjson.length == 0){
                        $("#knowledge").append('该学段学科下暂无知识点');
                        return;
                    }
                    var klStr = "";
                    for (var a = 0; a < mycheckjson.length; a++) {
                        if(a==0){
                            klStr += '<p data-pdeep="'+ mycheckjson[0].deep +'"><span class="selected" data-value=\'' + '' + '\' data-name=\'' + '不限' + '\' deep=\'' + mycheckjson[0].deep + '\'>' + '不限' + '<em></em></span>';
                        }
                        klStr += '<span data-value=\'' + mycheckjson[a].id + '\' data-name=\'' + mycheckjson[a].name + '\' deep=\'' + mycheckjson[a].deep+ '\'>' + mycheckjson[a].name + '</span>';
                    }
                    klStr += '</p>';
                    $("#knowledge").append(klStr);
                    $("#knowledge").off("click").on("click", "span", function () {
                        //var lv2_url = baseUrl + 'resource/queryKnowledgeLv2';
                        var lv_base_url = baseUrl + 'resource/queryKnowledgeLv';
                        var id = this.getAttribute("data-value");
                        var name = this.getAttribute("data-name");
                        var deep = this.getAttribute("deep");
                        $(this).addClass("selected").siblings().removeClass("selected");
                        // 点击不限的时候
                        if(!id || id == ''){
                            var deepUp = $(".choseBrdr").children("strong:last-child").data("deep") || "";
                            if(deepUp != deep){   // 正向查找
                                id = $('.choseBrdr').children("strong:last-child").data("value") || "";
                            }else{   // 反向查找
                                id = $('.choseBrdr').children("strong:last-child").prev().data("value") || "";
                            }

                        };
                        initChildLevel(lv_base_url, id, deep, name);
                        knowledgeCodeNew = id;
                        search_page(1, 6);
                    });
                    $(".choseBrdr").off("click").on("click", "em", function () {
                        var lv_base_url = baseUrl + 'resource/queryKnowledgeLv';
                        var id = $(this).parent().data("value");
                        var deep = $(this).parent().data("deep");
                        var lastId = $(this).parent().prev().data("value");
                        deleteChildLevel(lv_base_url, id, deep);
                        knowledgeCodeNew = lastId;
                        search_page(1, 6);
                    });

                } else {
                    alertwarn("页面加载失败！", "", true);
                    ;
                }
            }
        )
}
//学科
function getSubjectHidden(obj) {
    $.ajaxSettings.async = false;
    //加了这行代码就默认选中不限了
    categoryNew = "";
    var str = obj.getAttribute("data-name");
    var subjectId = obj.getAttribute("data-value");
    $("#dateTeacher").hide();
    $("#dateAuthor").hide();
    subjectNewId = subjectId;
    var subjectName = str.substring(0, str.indexOf('('));

    var subName;
    if(subjectName!=null &&subjectName!="" && subjectName!=undefined){
        subName = str.substring(str.indexOf('('),str.length);
    }else {
        subjectName = str.substring(0, str.indexOf('与'));
        if (subjectName != null && subjectName != "" && subjectName != undefined) {
             subName = str.substring(str.indexOf('与'), str.length);
        }else{
            var subjectName = str.substring(0,4);
            if (subjectName != null && subjectName != "" && subjectName != undefined && str.length >= 7){
                subName = str.substring(4, str.length);
            }
        }
    }
    if (str.indexOf('(')>0 ||(str.length>7 && str.indexOf('与')>0) || str.length > 7) {
        $("#subject_value").html("<p>"+subjectName+"</p>"+subName);
        $("#subject_value").css({"line-height":"20px","marginTop":"6px"});
    }else{
        $("#subject_value").html(obj.getAttribute("data-name"));
        $("#subject_value").css({"line-height":"52px","marginTop":"0px"});
    }
    $("#subjectId").val(obj.getAttribute("data-value"));

    // var sectionId = $("#sectionId").val();
    // var subjectId = $("#subjectId").val();

    // sectionNewId = sectionId;
    // subjectNewId = subjectId;
    knowledgeCodeNew = '';
    /*if (categoryNew != ''){
        if (categoryNew == 'teaching_introduction'){
            dateTeacher();
        } else if(categoryNew == 'author_introduction'){
            dateAuthor();
        } else {
            search_page(1, 6);
        }
    }else {
        search_page(1, 6);
    }*/
  var sectionId = $("#sectionId").val();
    $("#SYN").attr("href", "");
    $("#SYN").attr("href", "resource.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
    $("#SUB").attr("href", "");
    $("#SUB").attr("href", "resourceSubject.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
    $("#TINT").attr("href", "");
    $("#TINT").attr("href", "resourceAuthor.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
    $("#AUT").attr("href", "");
    $("#AUT").attr("href", "resourceTeaching.html?sectionNewId=" + sectionId + "&subjectNewId=" + subjectNewId);
    var baseUrl = getBasePath();
    var tree_url = baseUrl + 'resource/queryTree';
    var param = {subjectId: $("#subjectId").val()};
    //初始化菜单树
    initTree("tree", tree_url, settingCatalog, param);
    var lv1_url = getBasePath() + 'resource/queryKnowledgeLv1';
    getKnowledge(lv1_url,subjectNewId);

    var queryCategory_url = getBasePath() +'resource/queryCategory';
    getQueryCategory(queryCategory_url,sectionNewId,subjectNewId);
    if (categoryNew != ''){
        if (categoryNew == 'teaching_introduction'){
            dateTeacher();
        } else if(categoryNew == 'author_introduction'){
            dateAuthor();
        } else {
            search_page(1, 6);
        }
    }else {
        search_page(1, 6);
    }
    $.ajaxSettings.async = true;
}

// 教室介绍
