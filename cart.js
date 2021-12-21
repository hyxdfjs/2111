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

//获取数据库数据，渲染到页面
let body = document.querySelector('.J_cartGoods');
let template = '';
axios.get('http://localhost:3000/goods'
).then(({data}) => {
    // console.log(data);
    data.forEach(ele => {
        // console.log(ele);
        template += 
        `
        <div>
            <div class="col col-check" style="text-align: center">
                <input class="check-one check" type="checkbox" onclick="fn(this)">
            </div>
            <div class="col col-img">
                <img src="../images/1.png" alt="" style="width:60px;height:80px">
            </div>
            <div class="col col-name">
                ${ele.name}  ${ele.color}  ${ele.edition}
            </div>
            <div class="col col-price">
                5599
            </div>
            <div class="col col-num">
                <span class="reduce" style="border:1px solid #000000">-</span>
                ${ele.number}
                <span class="add" style="border:1px solid #000000">+</span>
            </div>
            <div class="col col-total">
                ${ele.price * ele.number}
            </div>  
            <div class="col col-action">
                <span class="delete">删除</span>
            </div>
        </div>
        `
    })
    body.innerHTML = template;
})
//实现全选
let allClick = document.querySelector('.check-all');
allClick.onclick = function () {
    let oneClick = document.querySelectorAll('.check-one')
    // console.log(oneClick);
    for (i = 0; i < oneClick.length; i++) {
        oneClick[i].checked = allClick.checked;
    }
    subTotal()
}
//实现单选
function fn(obj) {
    // console.log(obj);
    let oneClick = document.querySelectorAll('.check-one')
    let count = 0;
    // console.log(oneClick);
    oneClick.forEach(ele => {
        ele.checked && count++;
    })
    if (count == oneClick.length) {
        allClick.checked = true
    }
    if (!obj.checked) {
        allClick.checked = false    
    }
    subTotal()
}
//合计栏
let cartTotalNum = document.querySelector('#J_cartTotalNum')
let selTotalNum = document.querySelector('#J_selTotalNum')
let cartTotalPrice = document.querySelector('#J_cartTotalPrice')
//获取总商品数量
let ctNum = 0;
axios.get('http://localhost:3000/goods'
).then(({data}) => {
    // console.log(data.length);
    ctNum = data.length
    cartTotalNum.innerHTML = ctNum;
})
//获取旋转商品数量以及总计
function subTotal () {
    // console.log(11);
    // let ctNum = 0;
    let stNum = 0;
    let tPrice = 0;
    let oneClick = document.querySelectorAll('.check-one')
    // console.log(oneClick);
    // console.log(oneClick.length);
    ctNum = oneClick.length;
    oneClick.forEach(ele => {
        // console.log(ele.checked);
        if (ele.checked) {
            stNum++
            tPrice += (ele.parentNode.parentNode.querySelector('.col-total').innerHTML - 0)
        }
    })
    // console.log(stNum);
    // cartTotalNum.innerHTML = ctNum;
    selTotalNum.innerHTML = stNum;
    cartTotalPrice.innerHTML = tPrice;
}