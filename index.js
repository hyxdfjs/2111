/******00-登录和注册的改变（用户名）******/
let name = document.querySelector('#userlogin');
let quit = document.querySelector('#quit');
// console.log(JSON.parse(localStorage.getItem('name')));
name.innerHTML = JSON.parse(localStorage.getItem('name'));
if ( name != '') {
    quit.innerHTML = '退出'
} 

/******01-倒计时秒杀******/
var hour = document.querySelector('.hour');  //时
var minute = document.querySelector('.minute');  //分
var second = document.querySelector('.second');  //秒
var endDate = new Date('2021/12/17 00:00:00');  //倒计时结束时间
countDown();  //先调用一次，防止刷新空白
setInterval(countDown, 1000);
function countDown () {
    var nowDate = new Date();
    var times = parseInt( ( endDate.getTime() - nowDate.getTime() ) / 1000 );   //总的秒数
    var h = parseInt( times / 60 / 60 % 24 );  //剩余小时
    h = h < 10 ? '0' + h : h;  //补位操作
    hour.innerHTML = h;
    var m = parseInt( times / 60 % 60 );  //剩余分钟
    m = m < 10 ? '0' + m : m;
    minute.innerHTML = m;
    var s = parseInt( times % 60 );  //剩余秒数
    s = s < 10 ? '0' + s : s;
    second.innerHTML = s;
}
/******02-轮播图******/
//点击按钮切换图片
var item = document.querySelector('.carousel-inner');
var pic = item.children;
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var circleBtn = document.querySelector('.carousel-btn');
var num = 0
function picSwitching () {
    for (var i = 0; i < circleBtn.children.length; i++) {
        circleBtn.children[i].setAttribute('index', i);  //创建下标
        circleBtn.children[i].onclick = function () {
            var index = this.getAttribute('index')
            num = index;  //让下标进行关联操作
            for(var j = 0; j < circleBtn.children.length; j++) {
                circleBtn.children[j].className = '';  //排他
                pic[j].style.display = '';  //排他
            }
            this.className = 'active'
            pic[index].style.display = 'block';
        }
    }
}
picSwitching()
//点击左侧进行切换
prev.onclick = function () {
        num--;
        if (num < 0) {
            num = pic.length - 1;
        }
        for(var j = 0; j < circleBtn.children.length; j++) {
            circleBtn.children[j].className = '';
            pic[j].style.display = '';
        }
        circleBtn.children[num].className = 'active';
        pic[num].style.display = 'block';
}
//点击右侧进行切换
next.onclick = function () {
        num++;
        if (num > pic.length - 1) {
            num = 0;
        }
        for(var j = 0; j < circleBtn.children.length; j++) {
            circleBtn.children[j].className = '';
            pic[j].style.display = '';
        }
        circleBtn.children[num].className = 'active';
        pic[num].style.display = 'block';
}
//自动轮播
var timer = null;
function auto(){
    timer = setInterval( function () {
        next.onclick();  //让事件自调用，直接加括号就可以
    }, 3000)
}
auto()
//当鼠标移入到容器里面的时候让自动轮播停止
item.parentNode.onmouseover = function () {
    clearInterval(timer)
}
item.parentNode.onmouseout = function () {
    auto()
}
let name = document.querySelector('#userlogin')
console.log(localStorage.getItem('name'));
name.innerHTML = localStorage.getItem('name');
