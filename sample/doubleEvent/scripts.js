
//() in って何?
var touchSupport = ('ontouchstart' in document);

var events = {
    start: touchSupport ? 'touchstart' : 'mousedown', //タップ開始
    move: touchSupport ? 'touchmove' : 'mousemove', //ドラッグ中
    end: touchSupport ? 'touchend' : 'mouseup', //タップ終了
    over: touchSupport ? 'touchstart' : 'mouseenter', //マウスオーバー(SPはタップ開始)
    out: touchSupport ? 'touchend' : 'mouseleave'//マウスアウト(SPはタップ終了)
}

//要素準備
var floater = document.getElementById('floater');
var counter = document.getElementById('counter');

//ドラッグ中かを記憶するフラグ
var whileDrag = false;
// カウンター増加を止めるためのフラグ
var shouldStopCounter = false;


//click時にカウントを増加
counter.addEventListener(events.end, function(){
    //文字列を数値にし、10進法に表記
    var current = parseInt(counter.textContent, 10);
    counter.textContent = current + 1;
});

//ドラッグ開始
floater.addEventListener(events.start, function(){
    whileDrag = true;
});

//両方の要素にかけるのでdocument?
document.addEventListener(events.move, function(e){
//floaterの領域外であれば動作停止
if(!whileDrag){
    return;
}
//ページ全体にかかるのをさける
e.preventDefault();

var x = e.pageX;
var y = e.pageY;

//ドラッグを開始
floater.style.left = (x - 30) + 'px';
floater.style.top = (y - 30) + 'px';
//ドラッグが始まる＝カウンター増加を実行しない
shouldStopCounter = true;
});

/*floaterのイベントをcatch時に監視。stopPropagationフラグがあれば,
events.endイベントをcounterへ伝播しない*/
floater.addEventListener(events.end, function(e){
    if(shouldStopCounter){
        e.stopPropagation();
    }
    shouldStopCounter = false;
    whileDrag = false;
    //catch
}, true);