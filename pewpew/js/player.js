//######### Variables #######################
var container = document.getElementById('container');
var playerZone = document.getElementById('playerZone');
var player = document.getElementById('player');
var current = document.getElementsByClassName('bullet')[0];
var keys = {};
var hLine = 0;
var offset = 5;
var y = 0;
var forRemove = document.getElementsByClassName('bmove')[0];
var checkScore = false;
var target = document.getElementById('target');
var count = 0;
var bulletsLeft = document.getElementsByClassName('bullet').length;
//######### Outside Events ##########################
window.addEventListener('keydown', function(e) {
    keys[e.which] = true;
}, false);
//--------
window.addEventListener('keyup', function(e) {
    keys[e.which] = false;
}, false);
//--------
window.addEventListener('animationiteration', function() {
    if (count == 0) {
        count += 180;
        target.style.transform = "rotate(" + count + "deg)";
    } else {
        count = 0;
        target.style.transform = "rotate(" + count + "deg)";
    }
}, false);
//--------
window.addEventListener("transitionend",function() {
    forRemove.parentNode.removeChild(forRemove);
    if (checkScore) {
        document.querySelector('.info .score span').textContent++;
        checkScore = false;
        var clonetarget = target.cloneNode(true);
        target.parentNode.replaceChild(clonetarget, target);
        clonetarget.style.transform = "rotate(0deg)";
        count = 0;
    }
    if (bulletsLeft == 0) {
        document.addEventListener("click",function(e) {
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
    }
},false);
//--------
window.addEventListener('click', function () {
    current.style.left = Number(player.style.left.replace('px', '')) + 50 + 'px';
    current.classList.add('bmove');
    current.classList.remove('bullet');
});
//######### Game Loop ########################
function gameLoop() {
    forRemove = document.getElementsByClassName('bmove')[0];
    target = document.getElementById('target');
    current = document.getElementsByClassName('bullet')[0];
    bulletsLeft = document.getElementsByClassName('bullet').length;
//--------
    if (keys[65]) { // left
        hLine -= offset;
        if (hLine < 0) {
            hLine = 0;
        }
    }
    if (keys[68]) { // right
        hLine += offset;
        if (hLine > playerZone.clientWidth - player.clientWidth) {
            hLine = playerZone.clientWidth - player.clientWidth;
        }
    }
//--------
    player.style.left = hLine + 'px';
//--------
    y += 1;
    container.style.backgroundPosition = '0 ' + y + 'px';
//--------
    if (forRemove) {
        var blpos = forRemove.getBoundingClientRect().left;
        var tlpos = target.getBoundingClientRect().left;
        if (blpos >= tlpos && blpos <= tlpos + 120) {
            checkScore = true;
        }
    }
//--------
    document.querySelector('.info .bleft span').innerHTML = bulletsLeft;
	window.requestAnimationFrame(gameLoop);
}
gameLoop();
//###################################