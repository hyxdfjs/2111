let user = document.querySelector('#username');
let pwd = document.querySelector('#pwd');
let pwds = document.querySelector('#pwds');
let des = document.querySelectorAll('span');
//账号密码正则
let userReg = /^[a-zA-Z0-9_-]{4,16}$/;
let pwdReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
//失去焦点验证
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
    if (pwd.value == '') return
    if (pwd.value == pwds.value) {
        des[2].innerHTML = '√'
    } else {
        des[2].innerHTML = '两次输入的密码不一致'
    }
}
let txt2 = document.querySelector('.txt2');
var arr = []
//获取数据库已有账号
axios.get('http://localhost:3000/posts', {
    user: username
}).then(
    ({
        data
    }) => {
        console.log(data)
        for (i = 0; i < data.length; i++) {
            // console.log(data[i].user);
            var res = arr.push(data[i].user)
            // console.log(arr)
        }
    }
)
//可用则发送至数据库
txt2.onclick = () => {
    if (des[0].innerHTML == '√' && des[1].innerHTML == '√' && des[2].innerHTML == '√') {
        function inArr(value) {
            for (i = 0; i < arr.length; i++) {
                if (value != arr[i]) {
                    return true
                } else {
                    return false
                }
            }
        }
        if (inArr(user.value)) {
            axios.post('http://localhost:3000/posts', {
                user: user.value,
                pwd: pwd.value
            }).then(
                // ({
                //     data
                // }) => {
                //     console.log(data);
                // }
                window.location.href="index1.html"
            )
        } else{
            alert('账号已存在')
        }
    }
}
