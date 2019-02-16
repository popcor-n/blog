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
//选项卡单独操作
var titleol =  document.getElementsByTagName('ol')[0];//副选项卡选中
//用户列表
document.getElementById('user').addEventListener('click',function(){
    document.getElementsByTagName('ol')[0].style.display = 'inline-block'; 
    document.getElementById('userdata').style.display = 'block';
    document.getElementById('blogclass').style.display = 'none';
    titleol.getElementsByClassName('index')[0].innerHTML = '用户列表';  
    document.getElementById('a_user').style.color = 'rgb(124, 169, 226)';
    document.getElementById('a_class').style.color = '#888';
    
})
//博文分类逻辑
document.getElementById('classify').addEventListener('click',function(){
    document.getElementById('blogclass').style.display = 'block';    
    document.getElementsByTagName('ol')[0].style.display = 'inline-block';     
    document.getElementById('userdata').style.display = 'none';
    //让该展示的副选项卡部分展示
    titleol.getElementsByClassName('index')[0].innerHTML = '<span id= "class_add">添加分类</span><span> - </span><span id= "class_handle">分类管理</span>';  
    document.getElementById('a_class').style.color = 'rgb(124, 169, 226)';
    document.getElementById('a_user').style.color = '#888';
    document.getElementById('addclass').style.display = 'block';
})
//增加分类的ajax 逻辑
document.getElementById('go_name').addEventListener('click',function(){
    var xhraddclass = new XMLHttpRequest();
    xhraddclass.onload = function(){
        var output = JSON.parse(xhraddclass.responseText);
        console.log(output);
        
         document.getElementById('remind').innerHTML = output.message.toString();
        document.getElementById('remind').style.display = 'block';        
        setTimeout(() => {
            document.getElementById('remind').style.display = 'none';
        }, 3000);
    }
    xhraddclass.open('POST','http://localhost:8081/admin/classify/add',true)
    xhraddclass.setRequestHeader("Content-type","application/json");
    var name = document.getElementById('addclass_ip').value;
    if(name){
        xhraddclass.send(JSON.stringify({name:name}));
    }else{
        document.getElementById('remind').innerHTML = '分类名不能为空';
        document.getElementById('remind').style.display = 'block';        
        setTimeout(() => {
            document.getElementById('remind').style.display = 'none';
        }, 3000);
        
    }
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
            for(var i in output.message){
                var tr = document.createElement('tr');
                tr.setAttribute('id','user_'+i.toString());
                document.getElementById('usertable').appendChild(tr);
                document.getElementById('user_'+i.toString()).innerHTML = '<td>'+ output.message[i]._id.toString()+ '</td><td>'+output.message[i].username.toString()+ '</td><td>'+output.message[i].password.toString()+'</td>';
                if(output.message[i].Admin){
                    document.getElementById('user_'+i.toString()).innerHTML += '<td>是</td>'
                }else{
                    document.getElementById('user_'+i.toString()).innerHTML += '<td>否</td>'                    
                }
            }
        
        }
        xhruser.open('POST','http://localhost:8081/admin/user',true);
        xhruser.setRequestHeader("Content-type","application/json");
        var u_json = {req:'users'};
        xhruser.send(JSON.stringify(u_json));
        
    }
    else if(hash == '#classify'){
        var xhrclass = new XMLHttpRequest();
        xhrclass.onload = function(){
            var output = JSON.parse(xhruser.responseText);
            console.log(output);
            //填充副选项卡选择逻辑以及showbox展示部分
            
          



        }
        xhrclass.open('POST','http://localhost:8081/admin/classify',true);
        xhrclass.setRequestHeader("Content-type","application/json");
        var c_json = {req:'classify'};
        xhrclass.send(JSON.stringify(c_json));
    }




   
})
console.log('hello about');
