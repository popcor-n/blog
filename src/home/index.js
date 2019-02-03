import scss from './index.scss';
console.log('hello home');
console.log('hello world');
var reg = document.getElementById('register');//注册 前端逻辑
reg.getElementsByTagName('button')[0].addEventListener('click',function(){
    // setTimeout(() => {
    //     document.getElementById('login').style.display = 'block';
    //     document.getElementById('register').style.display = 'none';
    // }, 1000);

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
    var jsonl = {
        'username':document.getElementsByClassName('user')[1].value,
        'password':document.getElementsByClassName('pass')[1].value,
    }

    var xhrLog = new XMLHttpRequest();
    
    // xhrLog.withCredentials = true;    
    xhrLog.onload = function(){
        console.log(JSON.parse(xhrLog.responseText));
        var outputLog = JSON.parse(xhrLog.responseText);
        log.getElementsByClassName('index')[0].innerHTML = outputLog.message;

        //管理员
        if(outputLog.isadmin == true){
            document.getElementById('userData').innerHTML = '你好，管理员！'
            document.getElementById('admin').innerHTML = '<a href = http://localhost:8081/admin>管理页</a>';
        }else{
            document.getElementById('userData').innerHTML = '你好，欢迎'+outputLog.userData.name;

        }
    }
    xhrLog.open('POST','http://localhost:8081/api/user/login',true);
   
    xhrLog.setRequestHeader("Content-type","application/json");
    xhrLog.send(JSON.stringify(jsonl));
})


//首页展示
var nav = document.getElementById('nav');
for(let i = 0; i < 4; i++){
    nav.getElementsByClassName('index')[i].addEventListener('click',function(){
        if(nav.getElementsByClassName('current')[0]){
            nav.getElementsByClassName('current')[0].classList.remove('current');
        }
        this.classList.add('current');
    })
}


// window.addEventListener('hashchange',function(){
//     var hash = document.location.hash;
//     if(hash == '#first'){
    
//         var xhr = new XMLHttpRequest();
//         xhr.onload = function(){
//             var output =  JSON.parse(xhr.responseText);
//        console.log(output);
//         document.getElementsByClassName('one')[0].innerHTML = output[0] .say;
//         document.getElementsByClassName('two')[0].innerHTML = output[0].reply;
//         }
//         xhr.open('GET','./data.json',true);
//         xhr.send();
//     }
//     else if(hash == '#second'){
     
//         var xhr = new XMLHttpRequest();
//         xhr.onload = function(){
//             var output =  JSON.parse(xhr.responseText);
//        console.log(output);
//         document.getElementsByClassName('one')[0].innerHTML = output[1] .say;
//         document.getElementsByClassName('two')[0].innerHTML = output[1].reply; 
//         }
//         xhr.open('GET','./data.json',true);
//         xhr.send();
//     }
//     else{
//         var xhr = new XMLHttpRequest();
//         xhr.onload = function(){
//             var output =  JSON.parse(xhr.responseText);
//        console.log(output);
//         document.getElementsByClassName('one')[0].innerHTML = output[0] .say;
//         document.getElementsByClassName('two')[0].innerHTML = output[0].reply;
//         }
//         xhr.open('GET','./data.json',true);
//         xhr.send();
//     }
// })
