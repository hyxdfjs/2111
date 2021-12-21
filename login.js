let username = document.querySelector('#username');
let pwd = document.querySelector('#pwd');
let btn1 = document.querySelector('#btn1');
let des = document.querySelectorAll('span');

btn1.onclick = () => {
    if (username.value == '') {
        des[0].innerHTML = '请输入账号';
    }
    if (pwd.value == '') {
        des[1].innerHTML = '请输入密码';
    }
    if (username.value != '' && pwd.value != '') {
        axios.get(`http://localhost:3000/posts?user=${username.value}`
        ).then( ({data}) => {
            console.log(data[0]);
            if (data[0] == undefined) {
                alert('用户名或密码错误')
            } else {
                if (pwd.value == data[0].pwd) {
                    // alert('成功')
                    localStorage.setItem('name', JSON.stringify(username.value)),
                    window.location.href="index1.html"
            } else {
                    alert('用户名或密码错误')
                }
            }
        })
    }
}