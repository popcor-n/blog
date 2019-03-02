import scss from './index.scss';
console.log('hello home');
console.log('hello world');
// document.getElementById('left').style.height = 
// document.getElementById('re-log').addEventListener('click',function(){
//     setTimeout(() => {
//         document.getElementById('login').style.display = 'block';
//         document.getElementById('register').style.display = 'none';
//     }, 500);
    
// })
// document.getElementById('log-re').addEventListener('click',function(){
//     setTimeout(() => {
//         document.getElementById('register').style.display = 'block';
//         document.getElementById('login').style.display = 'none';
//     }, 500);
   
    
// })
var reg = document.getElementById('register');//注册 前端逻辑
document.getElementById('re-log').addEventListener('click',function(){
    var regBox = setInterval(function(){
        reg.style.marginLeft = parseInt(reg.style.marginLeft)-5+'px';
        if(parseInt(reg.style.marginLeft)<= -450){
            window.clearInterval(regBox);
            log.style.display = 'block';
            reg.style.display = 'none';
            reg.style.marginLeft = '-150px';
            document.getElementById('log-re').style.marginLeft = '0px';            
            
        }
    },10)
})
reg.getElementsByTagName('button')[0].addEventListener('click',function(){
    var xhrReg = new XMLHttpRequest();
    xhrReg.onload = function(){
        console.log(JSON.parse(xhrReg.responseText));
        var output = JSON.parse(xhrReg.responseText);
        reg.getElementsByClassName('index')[0].innerHTML = output.message;
        if(output.message=='注册成功！'){
            document.getElementById('userData').innerHTML = '你好，欢迎'+output.name;
            setTimeout(() => {
                leftBox();
            }, 1000);
        }
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
document.getElementById('log-re').addEventListener('click',function(){
    var logBox = setInterval(function(){
        log.style.marginLeft = parseInt(log.style.marginLeft)-5+'px';
        if(parseInt(log.style.marginLeft)<= -450){
            window.clearInterval(logBox);
            log.style.display = 'none';
            log.style.marginLeft = '-150px'            
            reg.style.display = 'block';
            document.getElementById('re-log').style.marginLeft = '0px';            
        }
    },10)
})
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
       
        if(outputLog.code == 0){
            if(outputLog.isadmin == true){
                document.getElementById('userData').innerHTML = '你好，管理员！';
                document.getElementById('admin').innerHTML = '<a href = http://localhost:8081/admin>管理页</a>';
            }else{
                document.getElementById('userData').innerHTML = '你好，欢迎'+outputLog.userData.name;
            }
            setTimeout(() => {
                leftBox();
            }, 1000);
        }
    }
    xhrLog.open('POST','http://localhost:8081/api/user/login',true);
   
    xhrLog.setRequestHeader("Content-type","application/json");
    xhrLog.send(JSON.stringify(jsonl));
})


//分类展示
var xhrindex = new XMLHttpRequest();
var classData;
xhrindex.onload = function(){
    var output_nav = JSON.parse(xhrindex.responseText);
    classData = output_nav.message;
    console.log(output_nav);
    for(let i in output_nav.message){
        document.getElementById('nav').innerHTML += '<div class="index">'+'<a href=#'+output_nav.message[i].name +'>'+output_nav.message[i].name+'</a>'+'</div>'
    }
    for(let i = 0; i < classData.length; i++){
        document.getElementById('nav').getElementsByClassName('index')[i].addEventListener('click',function(){
            if(nav.getElementsByClassName('current')[0]){
                nav.getElementsByClassName('current')[0].classList.remove('current');
            }
            this.classList.add('current');
        })
    }
}
xhrindex.open('POST','http://localhost:8081/main/nav',true);
xhrindex.setRequestHeader("Content-type","application/json");
xhrindex.send(JSON.stringify({req:'nav'}));

//获取内容
var xhrcon = new XMLHttpRequest();
xhrcon.onload = function(){
   let output = JSON.parse(xhrcon.responseText);
   console.log(output);
   while(document.getElementById('contentbox').hasChildNodes()){
    　　　document.getElementById('contentbox').removeChild(document.getElementById('contentbox').firstChild);
    }
   for(let i in output.message){
       if(output.message[i].content.length >200){
        document.getElementById('contentbox').innerHTML+='<h2><a href=#'+output.message[i]._id+'>'+output.message[i].title+'</a></h2><div id="content" class=content'+i+'>'+output.message[i].content.substr(0,200)+'...<br><p class = readmore id=readmore'+i+'><code>- 阅读剩余部分 -</code></p></div>';
       
        }else{
            document.getElementById('contentbox').innerHTML+='<h2>'+output.message[i].title+'</h2><div id="content" class=content'+i+'>'+output.message[i].content+'</div>';
       }
   }
   for(let i in output.message){
        document.getElementById('readmore'+i).onclick = function(){
        document.getElementsByClassName('content'+i)[0].innerHTML =output.message[i].content;
        }
   
    }
}
xhrcon.open('POST','http://localhost:8081/main/content',true);
xhrcon.setRequestHeader("Content-type","application/json");
xhrcon.send(JSON.stringify({req:'contents'}));
//clickbox
function leftBox(){
    if(document.getElementById('clickbox').className =='jiantou'){
        document.getElementById('clickbox').className = 'cha';        
        var rightTimer = setInterval(function(){
            document.getElementById('left').style.marginLeft  = parseInt(document.getElementById('left').style.marginLeft)+25 +'px';
            document.getElementById('moveclass').style.marginLeft = parseInt(document.getElementById('moveclass').style.marginLeft)+25 +'px';
            if(parseInt(document.getElementById('left').style.marginLeft)>= 330){
                window.clearInterval(rightTimer);
                document.getElementById('left').style.marginLeft = '330px';
                document.getElementById('moveclass').style.marginLeft = '330px';
                
            }
        },30);
        var reLog = setInterval(function(){
            document.getElementById('re-log').style.marginLeft = parseInt(document.getElementById('re-log').style.marginLeft)+10+'px';
            if(parseInt(document.getElementById('re-log').style.marginLeft)>= 218){
                window.clearInterval('reLog');
                document.getElementById('re-log').style.marginLeft = '218px';
            }
        },50);
        var Logre = setInterval(function(){
            document.getElementById('log-re').style.marginLeft = parseInt(document.getElementById('log-re').style.marginLeft)+10+'px';
            if(parseInt(document.getElementById('log-re').style.marginLeft)>= 218){
                window.clearInterval('Logre');
                document.getElementById('log-re').style.marginLeft = '218px';
            }
        },50);
    }else{
        var backTimer = setInterval(function(){
            document.getElementById('left').style.marginLeft  = parseInt(document.getElementById('left').style.marginLeft)-30 +'px';
            document.getElementById('moveclass').style.marginLeft = parseInt(document.getElementById('moveclass').style.marginLeft)-30 +'px';
            if(parseInt(document.getElementById('left').style.marginLeft)<=0){
                window.clearInterval(backTimer);
                document.getElementById('left').style.marginLeft = '0px';          
                document.getElementById('moveclass').style.marginLeft = '0px';
                 document.getElementById('clickbox').className = 'jiantou';        
                      
            }
        },30);
    }
}
document.getElementById('clickbox').addEventListener('click',leftBox)



//选中hash逻辑
window.addEventListener('hashchange',function(){
    var hash = document.location.hash;
    for(var i = 0; i < classData.length; i++){
        if(hash == '#'+classData[i].name){
            console.log(classData[i].name);
            var xhrcon = new XMLHttpRequest();
            xhrcon.onload = function(){
                let output = JSON.parse(xhrcon.responseText);
                console.log(output);
                while(document.getElementById('contentbox').hasChildNodes()){
                    　　　document.getElementById('contentbox').removeChild(document.getElementById('contentbox').firstChild);
                }
                for(let i in output.message){
                    if(output.message[i].content.length >200){
                        document.getElementById('contentbox').innerHTML+='<h2>'+output.message[i].title+'</h2><div id="content" class=content'+i+'>'+output.message[i].content.substr(0,200)+'...<br><br><p class = readmore id=readmore'+i+'>- 阅读剩余部分 -</p></div>';
                    
                        }else{
                            document.getElementById('contentbox').innerHTML+='<h2>'+output.message[i].title+'</h2><div id="content" class=content'+i+'>'+output.message[i].content+'</div>';
                    }
                }
                for(let i in output.message){
                        document.getElementById('readmore'+i).onclick = function(){
                        document.getElementsByClassName('content'+i)[0].innerHTML =output.message[i].content;
                        }
                
                }
            }
            xhrcon.open('POST','http://localhost:8081/main/content/class',true);
            xhrcon.setRequestHeader("Content-type","application/json");
            xhrcon.send(JSON.stringify({req:classData[i]._id}));
        }
    }

})

//取窗口滚动条高度 
function getScrollTop() {
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
setInterval(function(){
    if(document.documentElement.scrollTop > 300){
        document.getElementById('upicon').style.display = 'block';
    }else{
        document.getElementById('upicon').style.display = 'none';
    }
},100);

document.getElementById('upicon').addEventListener('click',function(){
    var timer=setInterval(function(){
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var ispeed=Math.floor(-scrollTop/15);
        if(scrollTop==0){
            clearInterval(timer);
        }
        document.documentElement.scrollTop=document.body.scrollTop=scrollTop+ispeed;
    },20)
})
