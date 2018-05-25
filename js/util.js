angular.module('wz')
    .factory('Util',function(){
        return{
            alert: function(type, msg){
                var htmlstyle = "<style>.msg{color:#FFF;width:100%;height:45px;text-align:center;line-height:43px;position:fixed;top:-45px;right:0px;left:0px;z-index:20;}"
                    +".msg_success{background-color:#1fcc6c;}"
                    +".msg_warning{background-color:#e94b35;}"
                    +".msg_primary{background-color:#337ab7;}"
                    +".msg_info{background-color:#5bc0de;}</style>";
                $('head').append(htmlstyle);
                $('body').prepend('<div class="msg msg_success"></div>'
                +'<div class="msg msg_warning"></div>'
                +'<div class="msg msg_primary"></div>'
                +'<div class="msg msg_info"></div>');

                $('.msg_'+type).html(msg);
                $('.msg_'+type).animate({'top': 0},500);
                setTimeout(function(){$('.msg_'+type).animate({'top': '-45px'},500)},2000);
            }
        }
    })
