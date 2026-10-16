 /**
  * 基于jQuery的fixed插件
  * @param eleScrollLeft  两个值，true or false,默认true
  * @param ele 需要fixed的元素id
  * @param eleTopNum fixed的top值
  * @param eleAddClass 需要增加的类名
  * @param eleAddClassPar 父元素需要增加的类名
  * @param eleZindex fixed元素层级关系
  * @param elesOffsetTop 该属性只针对ele隐藏的情况，其他情况调用时不用加
  * http://front.chinaso365.com/autodemo/index_fixed/common_fixed/index.html
  * @version   v2.0.0  
  * @auhor    maguoxiong@chinaso.com  
  * @data     2017-11-02 15:12:05
  **/
 
(function($){
    $.fn.extend({
        commonFixed: function(options){
            var isIE6=!-[1,]&&!window.XMLHttpRequest;
            var defaults = {
                    eleScrollLeft: true,//两个值，true or false,默认true
                    ele: '#commonFixedDiv',//需要fixed的元素id
                    eleTopNum: 0,//fixid的top值
                    eleHeight: $('.head').outerHeight(true),//隐藏之前.head_wap_fixed的高度
                    eleAddClass:'commonNavFixed',//需要增加的类名
                    eleAddClassPar:'commonNavFixedPar',//父元素需要增加的类名
                    eleZindex: '99999',
                    elesOffsetTop: $(options.ele).offset().top - options.eleTopNum * 2//该属性只针对ele隐藏的情况，其他情况调用时不用加
                },
                options = $.extend(defaults, options),
                $thisFixed = this,
                eles = $thisFixed.find(options.ele),
                eleTop = options.elesOffsetTop;

            $(window).on("scroll", function () {
                var scrollTop = $(document).scrollTop();
                var scrollLeft = $(document).scrollLeft();
                var eleLeft = eles.parent().offset().left;
                if (options.eleScrollLeft) {
                    eleLeft -= scrollLeft;
                }

                if (scrollTop > eleTop) {
                    if(isIE6){
                        var sIE6= options.eleTopNum;
                        $('html').css({
                            'background-image':'url(about:blank)',
                            'background-attachment':'fixed'
                        });
                        eles.css({
                            position:'absolute',
                            'bottom':'auto',
                            'top': document.documentElement.scrollTop + sIE6 + 'px',
                            'z-index': options.eleZindex
                        });
                    }else{
                        eles.css({
                            position: 'fixed',
                            top: options.eleTopNum + 'px',
                            left: eleLeft,
                            'z-index': options.eleZindex
                        });
                    }
                    eles.addClass(options.eleAddClass);
                    eles.parent().addClass(options.eleAddClassPar);
                    //console.log(!options.eleTopNum);
                    if (!options.eleTopNum) {
                        $('.' + options.eleAddClassPar).css({
                            paddingTop: options.eleHeight
                        })
                    } 
                } else {
                    if (!options.eleTopNum) {
                        $('.' + options.eleAddClassPar).css({
                            paddingTop: 0
                        })
                    } 
                    eles.removeClass(options.eleAddClass);
                    eles.parent().removeClass(options.eleAddClassPar);
                    eles.css({
                        position: '',
                        top:'',
                        'bottom':'',
                        left: '',
                        'z-index': ''
                    });
                }
            });
            $(window).on('resize',function(){
                $(window).trigger("scroll");
            });
        }
    })
})(jQuery);