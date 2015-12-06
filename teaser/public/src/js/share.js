/**
 * Created by mayajuni-home on 2015-11-07.
 */

var url = 'http://wanname.kr';
/* 페이스북 */
function shareFacebook() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
}
/* 카카오톡 */
function shareKakao() {
    window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url));
}
/* 블로그 */
function shareNaver() {
    window.open('http://blog.naver.com/openapi/share?url=' + encodeURIComponent(url));
}
/*
var g_bInitKakao = false;

function InitKakao(strKey){
    if( !g_bInitKakao ){
        Kakao.init(strKey);
        g_bInitKakao = true;
    }
}

function ShareKakaostory(strKey, strUrl, strTitle){
    InitKakao(strKey);

    Kakao.Story.share({
        url: strUrl,
        text: strTitle
    });
}

function SendSNS(sns, title, url, image)
{
    var o;
    var _url = encodeURIComponent(url);
    var _title = encodeURIComponent(title);
    var _br  = encodeURIComponent('\r\n');

    switch(sns)
    {
        case 'facebook':
            o = {
                method:'popup',
                height:600,
                width:600,
                url:'http://www.facebook.com/sharer/sharer.php?u=' + _url
            };
            break;

        case 'twitter':
            o = {
                method:'popup',
                height:600,
                width:600,
                url:'http://twitter.com/intent/tweet?text=' + _title + '&url=' + _url
            };
            break;

        case 'google':
            o = {
                method:'popup',
                height:600,
                width:600,
                url:'https://plus.google.com/share?url={' + _url + '}'
            };
            break;

        case 'naverband':
            o = {
                method:'web2app',
                param:'create/post?text=' + _title + _br + _url,
                a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',
                g_store:'market://details?id=com.nhn.android.band',
                a_proto:'bandapp://',
                g_proto:'scheme=bandapp;package=com.nhn.android.band'
            };
            break;

        case 'naverblog':
            o = {
                method:'popup',
                height:600,
                width:600,
                url:'http://blog.naver.com/openapi/share?url=' + _url + '&title=' + _title
            };
            break;

        default:
            return false;
    }

    switch(o.method)
    {
        case 'popup':
            if( o.height > 0 && o.width > 0 ){
                window.open(o.url,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height='+o.height+',width='+o.width);
            }
            else{
                window.open(o.url);
            }

            break;

        case 'web2app':
            if(navigator.userAgent.match(/android/i)){
                setTimeout(function(){ location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'}, 100);
            }
            else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i)){
                setTimeout(function(){ location.href = o.a_store; }, 200);
                setTimeout(function(){ location.href = o.a_proto + o.param }, 100);
            }
            else{
                alert('Only mobile');
            }
            break;
    }
}*/
