var searchfields = $(" input[ name='searchfields' ] ").val();
var timetype = $(" input[ name='timetype' ] ").val();
var iszq = $(" input[ name='iszq' ] ").val();
var sm = $(" input[ name='sm' ] ").val();
var channelName = $(" input[ name='channelName' ] ").val();
var websiteName = $(" input[ name='websiteName' ] ").val();

var rollUrl = '/hunan/agg/data?q=' + encodeURIComponent(qValue, "UTF-8") + '&searchfields=' + searchfields + '&sm=' + sm + '&timetype=' + timetype + '&t=' + channel + '';
(function () {
    var searchcode = $(".classification-tab .cur").attr('data');
    var jsonPath = rollUrl + '&websiteName=' + searchcode;
    var className = $(".classification-tab .cur").attr('data-idx');



    $(".classification-tab>ul>li>a").click(function () {
        if(($(".classification-tab>ul>li>a").hasClass("cur"))){
            var className = $(this).attr('data-idx');
            // console.log(websiteCode)
            var searchcode = $(this).attr('data')
            var jsonPath = rollUrl + '&websiteName=' + searchcode;
            getNews(jsonPath, searchcode, className);
        }
    }
    );

    function getNews(jsonPath, searchcode, className) {
        $.ajax({
            type: 'GET',
            url: jsonPath,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                $("#loading").eq(className).show();
                $(".nav-more").hide();

            },
            success: function (data, textStatus) {
                $("#loading").hide();
                $(".nav-more").eq(className).show();
                var html = "";
                for (var i = 0; i < data.aggr_list.length; i++) {
                    var curClass = '';
                    if (channelName == data.aggr_list[i].name && searchcode == websiteName) {
                        // console.log("websiteName",websiteName)
                        // console.log("11111111111111",channelName == data.aggr_list[i].name && searchcode == websiteName)
                        curClass = ' class="highlight"';
                    }
                    if (i == 0) {
                        html += '<li title=' + data.aggr_list[i].name + '（' + data.aggr_list[i].count + '）' +'><a' + curClass + ' href="/hunan/' + websiteCode + '/' + channel + '?q=' + encodeURIComponent(qValue, "UTF-8") + '&websiteName=' + searchcode + '&channelName=' + encodeURIComponent(data.aggr_list[i].name, "UTF-8") + '&searchfields=' + searchfields + '&sm=' + sm  + '&timetype=' + timetype + '&aggr_iszq=1' + '&iszq=' + iszq + '"><span>' + data.aggr_list[i].name + '</span><i>（' + data.aggr_list[i].count + '）</i></a></li>'
                    } else {
                        html += '<li title=' + data.aggr_list[i].name + '（' + data.aggr_list[i].count + '）' + '><a' + curClass + ' href="/hunan/' + websiteCode + '/' + channel + '?q=' + encodeURIComponent(qValue, "UTF-8") + '&websiteName=' + searchcode + '&channelName=' + encodeURIComponent(data.aggr_list[i].name, "UTF-8") + '&searchfields=' + searchfields + '&sm=' + sm  + '&timetype=' + timetype + '&aggr_iszq=1' + '&iszq=' + iszq + '"><span>' + data.aggr_list[i].name + '</span><i>（' + data.aggr_list[i].count + '）</i></a></li>'
                    }


                }
                $(".classification-con-box").eq(className).html(html)
                $("#a_c_2").attr("value", data.aggr_cache)
            },
            error: function (XMLHttpRequest, textStatus) {
                // alert("sorry, 请求错误，请刷新重试");
            }
        })
    }

    if (searchcode != undefined) {
        getNews(jsonPath, searchcode, className);
    }
})
    ();


$(function () {
    $(".searchbox").click(function (event) {
        //取消冒泡事件
        event.stopPropagation();//这句是必须
        $("#search_input").addClass('searchClick')
    });

    //点击空白或者其他区域时divTop隐藏
    $(document).click(function () {
        $("#search_input").removeClass('searchClick')
    });

});
