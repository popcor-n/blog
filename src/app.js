import css from './app.sass'

console.log('hello world');

document.getElementById('re-log').addEventListener('click',function(){
    setTimeout(() => {
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'none';
    }, 500);
    
})
document.getElementById('log-re').addEventListener('click',function(){
    setTimeout(() => {
        document.getElementById('register').style.display = 'block';
        document.getElementById('login').style.display = 'none';
    }, 500);
   
    
})

var reg = document.getElementById('register');//注册 前端逻辑
reg.getElementsByTagName('button')[0].addEventListener('click',function(){
    setTimeout(() => {
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'none';
    }, 1000);

    var xhrReg = new XMLHttpRequest();
    xhrReg.onload = function(){
        console.log(JSON.parse(xhrReg.responseText));
        var output = JSON.parse(xhrReg.responseText);
        reg.getElementsByClassName('index')[0].innerHTML = output.message;
    }
    xhrReg.open('POST','http://localhost:8081/api/user/register',true);
    var json = {
        'username':document.getElementsByClassName('user')[0].value,
        'password':document.getElementsByClassName('pass')[0].value,
        'rePassword':document.getElementsByClassName('rePass')[0].value 
    }
    xhrReg.setRequestHeader("Content-type","application/json");
    xhrReg.send(JSON.stringify(json));
})

var log = document.getElementById('login');//登录 前端逻辑
log.getElementsByTagName('button')[0].addEventListener('click',function(){
  

    var xhrLog = new XMLHttpRequest();
    xhrLog.onload = function(){
        console.log(JSON.parse(xhrLog.responseText));
        var outputLog = JSON.parse(xhrLog.responseText);
       log.getElementsByClassName('index')[0].innerHTML = outputLog.message;
    }
    xhrLog.open('POST','http://localhost:8081/api/user/login',true);
    var json = {
        'username':document.getElementsByClassName('user')[0].value,
        'password':document.getElementsByClassName('pass')[0].value,
    }
    xhrLog.setRequestHeader("Content-type","application/json");
    xhrLog.send(JSON.stringify(json));
})
