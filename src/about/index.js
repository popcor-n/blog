import scss from './index.scss';

var passnum = 1;
var passBox = document.getElementById('passBox');
passBox.addEventListener('click',function fir(){
    if(passnum == 1){
        var l = 0;
        var move = setInterval(function() {
             l+= 0.03;
            passBox.style.top = passBox.offsetTop + l + 'px';
            if(passBox.offsetTop >= 200){
                window. clearInterval(move);
                passnum = 0;
             }
        }, 30)
    }
  
})
passBox.addEventListener('click',function sec(){
    //预留3dcss3转化
    if(passnum != 1){
        document.getElementById('passCover').style.display = 'none';
    }
})
document.getElementById ('bt').addEventListener('click',function(){
    if(document.getElementById('pass').getElementsByTagName('input')[0].value == 'Admin'){
        console.log('ok');
       // 以及上下拼接效果 完成后台功能后添加

       passBox.style.display = 'none';

    }
})
var myDate = new Date();
document.getElementById('day').innerHTML =  myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日';
//ajax用户管理
document.getElementById('user').addEventListener('click',function(){
    document.getElementsByTagName('ol')[0].style.display = 'inline-block'; 
    document.getElementById('userdata').style.display = 'block';
    var titleol =  document.getElementsByTagName('ol')[0];
    titleol.getElementsByClassName('index')[0].innerHTML = '用户列表';  
    document.getElementById('a_user').style.color = 'rgb(124, 169, 226)';
})
//spa
window.addEventListener('hashchange',function(){
    var hash = document.location.hash;
    var xhruser = new XMLHttpRequest();
    if(hash == '#user'){
        xhruser.onload = function(){
            var output = JSON.parse(xhruser.responseText);
            console.log(output);
            //填充

           //动态添加表格
        
        }
        xhruser.open('POST','http://localhost:8081/admin/user',true);
        xhruser.setRequestHeader("Content-type","application/json");
        var u_json = {req:'users'};
        xhruser.send(JSON.stringify(u_json));
        
    }
   
})
console.log('hello about');
