let user = document.querySelector('#username');
let pwd = document.querySelector('#pwd');
let pwds = document.querySelector('#pwds');
let des = document.querySelectorAll('span');

let userReg = /^[a-zA-Z0-9_-]{4,16}$/;
let pwdReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

user.onblur = () => {
    if (userReg.test(user.value)) {
        des[0].innerHTML = '√'
    } else {
        des[0].innerHTML = '账号格式不正确'
    }
}

pwd.onblur = () => {
    if (pwdReg.test(pwd.value)) {
        des[1].innerHTML = '√'
    } else {
        des[1].innerHTML = '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
    }
}

pwds.onblur = () => {
    if (pwd.value == pwds.value) {
        des[2].innerHTML = '√'
    } else {
        des[2].innerHTML = '两次输入的密码不一致'
    }
}