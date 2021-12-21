let name = document.querySelector('#userlogin');
let quit = document.querySelector('#quit');
// console.log(JSON.parse(localStorage.getItem('name')));
name.innerHTML = JSON.parse(localStorage.getItem('name'));
if (name.innerHTML != '') {
    quit.innerHTML = '退出'
    quit.href = "index1.html"
}
quit.onclick = function () {
    localStorage.removeItem('name');
    // window.location.href="index1.html";
    name.innerHTML = '登录';
    // quit.href = "register.html"
}
if (quit.innerHTML == '注册') {
    name.innerHTML = '登录';
}


/******01-轮播图******/
//点击按钮切换图片
var item = document.querySelector('#slider');
var pic = item.children;
var prev = document.querySelector('#previous');
var next = document.querySelector('#next');
var circleBtn = document.querySelector('.bbttnn');
var num = 0

function picSwitching() {
    for (var i = 0; i < circleBtn.children.length; i++) {
        circleBtn.children[i].setAttribute('index', i); //创建下标
        circleBtn.children[i].onclick = function () {
            var index = this.getAttribute('index')
            num = index; //让下标进行关联操作
            for (var j = 0; j < circleBtn.children.length; j++) {
                pic[j].style.display = 'none'; //排他
                picture[j].style.display = 'none'; //排他
            }
            pic[index].style.display = 'block';
            picture[index].style.display = 'block';
        }
    }
}
picSwitching()
//点击左侧进行切换
prev.onclick = function () {
    num--;
    if (num < 0) {
        num = pic.length - 2;
    }
    for (var j = 0; j < circleBtn.children.length; j++) {
        pic[j].style.display = 'none';
        picture[j].style.display = 'none';
    }
    pic[num].style.display = 'block';
    picture[num].style.display = 'block';
}
//点击右侧进行切换
next.onclick = function () {
    num++;
    if (num > pic.length - 2) {
        num = 0;
    }
    for (var j = 0; j < circleBtn.children.length; j++) {
        pic[j].style.display = 'none';
        picture[j].style.display = 'none';
    }
    pic[num].style.display = 'block';
    picture[num].style.display = 'block';
}
/******02-放大镜******/
var smallBox = document.querySelector('#slider');
var mask = document.querySelector('#slider>span');
var bigBox = document.querySelector('#magnify');
var picture = document.querySelectorAll('#magnify>img');
//当鼠标划入到smallBox里面时，让隐藏的元素显示
smallBox.onmouseover = function () {
    mask.style.display = 'block'
    bigBox.style.display = 'block'
}
//当鼠标划到smallBox外面时，让显示的元素隐藏
smallBox.onmouseout = function () {
    mask.style.display = 'none'
    bigBox.style.display = 'none'
}
//当鼠标移入到smallBox里面时让鼠标进行跟随
smallBox.onmousemove = function (e) {
    e = e || window.event
    //获取鼠标的坐标
    let x = e.pageX - smallBox.offsetParent.offsetLeft - mask.offsetWidth / 2
    let y = e.pageY - smallBox.offsetParent.offsetTop - mask.offsetHeight / 2
    //边界值判断
    if (x <= 88) {
        x = 88
    } else if (x >= smallBox.offsetWidth - mask.offsetWidth - 88) {
        x = smallBox.offsetWidth - mask.offsetWidth - 88
    }
    if (y <= 80) {
        y = 80
    } else if (y >= smallBox.offsetHeight - mask.offsetHeight - 115) {
        y = smallBox.offsetHeight - mask.offsetHeight - 115
    }
    //进行赋值
    mask.style.left = x + 'px'
    mask.style.top = y + 'px'

    //计算比例
    let w = x / (smallBox.offsetWidth - mask.offsetWidth - 176)
    let h = y / (smallBox.offsetHeight - mask.offsetHeight - 195)
    //给大图进行赋值操作
    picture[num].style.left = -w * (picture[num].offsetWidth - bigBox.offsetWidth) + 118 + 'px'
    picture[num].style.top = -h * (picture[num].offsetHeight - bigBox.offsetHeight) + 100 + 'px'
}
/******03-加入购物车******/
let color = document.querySelectorAll('.getbuy-middle-box2>span');
let edition = document.querySelectorAll('.getbuy-middle-box3>span');
let flag1 = 0;
let flag2 = 0;
//设置颜色选中样式
function selectColor() {
    for (i = 0; i < color.length; i++) {
        color[i].setAttribute('index', i);
        color[i].onclick = function () {
            var index = this.getAttribute('index');
            for (var j = 0; j < color.length; j++) {
                color[j].style.color = '#000000';
                color[j].style.border = '1px solid #cccccc'; //排他
                color[j].className = '';
            }
            color[index].style.color = '#ff6700';
            color[index].style.border = '1px solid #ff6700';
            color[index].className = 'goodColor';

            flag1 = 1;
        }
    }
}
selectColor();
//设置版本选中样式
function selectEdition() {
    for (i = 0; i < edition.length; i++) {
        edition[i].setAttribute('index', i);
        edition[i].onclick = function () {
            var index = this.getAttribute('index');
            for (var j = 0; j < edition.length; j++) {
                edition[j].style.color = '#000000';
                edition[j].style.border = '1px solid #cccccc'; //排他
                edition[j].className = '';
            }
            edition[index].style.color = '#ff6700';
            edition[index].style.border = '1px solid #ff6700';
            edition[index].className = 'goodEdition';

            flag2 = 1;
        }
    }
}
selectEdition();
/******04-发送server******/
let add = document.querySelector('#add');
let goodName = document.querySelector('#goodName');
add.onclick = function () {
    let goodColor = document.querySelector('.goodColor');
    let goodEdition = document.querySelector('.goodEdition');
    // console.log(goodEdition);
    let goodEditions=(goodEdition.innerHTML).replace(/[+]/g,'')
    // console.log(goodEdition);
    // console.log(goodEditions);
    if (!flag1) {
        alert('请选择颜色');
    } else {
        if (!flag2) {
            alert('请选择版本');
        } else {
            axios.get(`http://localhost:3000/goods?name=${goodName.innerHTML}&color=${goodColor.innerHTML}&edition=${goodEditions}&price=5599`)
            .then(({data}) => {
                if (data.length == 0) {
                    axios.post('http://localhost:3000/goods', {
                        name: goodName.innerHTML,
                        color: goodColor.innerHTML,
                        edition: goodEditions,
                        price: "5599",
                        number: 1
                    })
                } 
                else {
                    axios.put(`http://localhost:3000/goods/${data[0].id}`, {
                        name: goodName.innerHTML,
                        color: goodColor.innerHTML,
                        edition: goodEditions,
                        price: "5599",
                        number: data[0].number + 1
                    })
                }
            })
        }
    }
}