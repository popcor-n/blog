import scss from './index.scss';

// var passnum = 1;
// var passBox = document.getElementById('passBox');
// passBox.addEventListener('click',function fir(){
//     if(passnum == 1){
//         var l = 0;
//         var move = setInterval(function() {
//              l+= 0.03;
//             passBox.style.top = passBox.offsetTop + l + 'px';
//             if(passBox.offsetTop >= 200){
//                 window. clearInterval(move);
//                 passnum = 0;
//              }
//         }, 30)
//     }
  
// })
// passBox.addEventListener('click',function sec(){
//     //预留3dcss3转化
//     if(passnum != 1){
//         document.getElementById('passCover').style.display = 'none';
//     }
// })
// document.getElementById ('bt').addEventListener('click',function(){
//     if(document.getElementById('pass').getElementsByTagName('input')[0].value == 'Admin'){
//         console.log('ok');
//        // 以及上下拼接效果 完成后台功能后添加

//        passBox.style.display = 'none';

//     }
// })
document.getElementById('head_submit').addEventListener('click',function(){
    if(document.getElementById('head_password').value == 'Admin'){
        // document.getElementById('body').style.opacity = 
        var times = setInterval(function(){
            document.getElementById('body').style.opacity -= 0.01;
            if(document.getElementById('body').style.opacity <= 0){
                document.getElementById('body').style.display = 'none';
                window.clearInterval(times);
                 window.location.hash = '#user';
                
            }
        } ,10);
        document.getElementById('head_window').style.display = 'none';
        document.getElementById('title').style.display = 'block';
    }
})
var myDate = new Date();
document.getElementById('day').innerHTML =  myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日';
//ajax用户管理
//选项卡单独操作
var titleol =  document.getElementsByTagName('ol')[0];//副选项卡选中
//处理分类两个选项逻辑
document.getElementById('class_add').addEventListener('click', function (){
    document.getElementById('addclass').style.display = 'block';
    document.getElementById('handleclass').style.display = 'none';
    document.getElementById('pic').style.left ='204px';
    document.getElementById('modclass').style.display = 'none';
    document.getElementById('class_mod').style.display = 'none';    
})
document.getElementById('class_handle').addEventListener('click', function(){
    document.getElementById('addclass').style.display = 'none';
    document.getElementById('handleclass').style.display = 'block';
})
//增加分类的ajax 逻辑
document.getElementById('go_name').addEventListener('click',function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        var output = JSON.parse(xhr.responseText);
        console.log(output);
        document.getElementById('remind').innerHTML = output.message.toString();
        document.getElementById('remind').style.display = 'block';        
        setTimeout(() => {
            document.getElementById('remind').style.display = 'none';
        }, 3000);
    }
    xhr.open('POST','http://localhost:8081/admin/classify/add',true)
    xhr.setRequestHeader("Content-type","application/json");
    var name = document.getElementById('addclass_ip').value;
    if(name){
        xhr.send(JSON.stringify({name:name}));
    }else{
        document.getElementById('remind').innerHTML = '分类名不能为空';
        document.getElementById('remind').style.display = 'block';        
        setTimeout(() => {
            document.getElementById('remind').style.display = 'none';
        }, 3000);
        
    }
})

//分类列表ajax逻辑
var data_class;
var data_blog;

//spa
window.addEventListener('hashchange',function(){
    var delname;
    var hash = document.location.hash;
    var pic = document.getElementById('pic');
    pic.style.display = 'inline-block';
    pic.style.left ='204px';
    
    if(hash == '#class'){
        // this.console.log('class');
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            var output = JSON.parse(xhr.responseText);
            console.log(output);
            document.getElementById('userdata').style.display = 'none';
            
            document.getElementById('blogclass').style.display = 'block';    
            document.getElementsByTagName('ol')[0].style.display = 'inline-block';     
            //让该展示的副选项卡部分展示
          
            titleol.getElementsByClassName('index1')[0].style.display = 'inline-block';
            titleol.getElementsByClassName('index')[0].style.display = 'none';
            titleol.getElementsByClassName('index2')[0].style.display = 'none';
            
            document.getElementById('a_class').style.color = 'rgb(124, 169, 226)';
            document.getElementById('a_user').style.color = '#888';
            document.getElementById('a_content').style.color = '#888';
            document.getElementById('addclass').style.display = 'block';
            document.getElementById('handleclass').style.display = 'none';
            document.getElementById('blogcontent').style.display = 'none';
            document.getElementById('modclass').style.display = 'none';
            document.getElementById('delclass').style.display='none';                
            document.getElementById('class_del').style.display = 'none'; 
            document.getElementById('bloghandle').style.display = 'none';    
            document.getElementById('blogdelete').style.display = 'none';
            document.getElementById('bloghandle').style.display = 'none';
        }
        xhr.open('POST','http://localhost:8081/admin/classify',true);
        xhr.setRequestHeader("Content-type","application/json");
        var c_json = {req:'classify'};
        xhr.send(JSON.stringify(c_json));
        document.getElementById('class_mod').style.display = 'none';
        
    }
        
   else if(hash == '#user'){
        var xhruser = new XMLHttpRequest();
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
            document.getElementsByTagName('ol')[0].style.display = 'inline-block'; 
            document.getElementById('userdata').style.display = 'block';
            document.getElementById('blogclass').style.display = 'none';
            document.getElementById('blogcontent').style.display = 'none';
            titleol.getElementsByClassName('index1')[0].style.display = 'none';
            titleol.getElementsByClassName('index')[0].style.display = 'inline-block'; 
            titleol.getElementsByClassName('index2')[0].style.display = 'none';
            document.getElementById('a_user').style.color = 'rgb(124, 169, 226)';
            document.getElementById('a_class').style.color = '#888';
            document.getElementById('a_content').style.color = '#888';
            document.getElementById('class_mod').style.display = 'none';
            document.getElementById('blogdelete').style.display = 'none';
            
            document.getElementById('bloghandle').style.display = 'none';
        
        }
        xhruser.open('POST','http://localhost:8081/admin/user',true);
        xhruser.setRequestHeader("Content-type","application/json");
        var u_json = {req:'users'};
        xhruser.send(JSON.stringify(u_json));
    }
    else if(hash == '#content'){
        document.getElementById('userdata').style.display = 'none';
        document.getElementById('blogclass').style.display = 'none';  
        document.getElementById('bloghandle').style.display = 'none';
        document.getElementById('blogcontent').style.display = 'block';  
        document.getElementById('blogadd').style.display = 'block';
        document.getElementsByTagName('ol')[0].style.display = 'inline-block';   
        document.getElementById('pic').style.left ='204px';  
        document.getElementById('blogdelete').style.display = 'none';
        document.getElementById('blog_del').style.display = 'none';  
        document.getElementById('handleclass').style.display = 'none';   
        document.getElementById('blog_mod').style.display = 'none';          
        document.getElementById('blogmod').style.display='none';                
         
          
        
        //让该展示的副选项卡部分展示
      
        titleol.getElementsByClassName('index2')[0].style.display = 'inline-block';
        titleol.getElementsByClassName('index')[0].style.display = 'none';
        titleol.getElementsByClassName('index1')[0].style.display = 'none';
        document.getElementById('a_user').style.color = '#888';
        document.getElementById('a_class').style.color = '#888';
        document.getElementById('a_content').style.color = 'rgb(124, 169, 226)';
        var xhr = new XMLHttpRequest();
        
        xhr.onload = function(){
            var output = JSON.parse(xhr.responseText);
            console.log(output);
            while(document.getElementById('blog_type').hasChildNodes()){
                　　　document.getElementById('blog_type').removeChild(document.getElementById('blog_type').firstChild);
            }
            for(let i in output.message){
                document.getElementById('blog_type').innerHTML+='<option value='+output.message[i]._id+'>'+output.message[i].name+'</option>';
            }
            // document.getElementById('blog_submit').addEventListener('click',function(){
            //     document.getElementById('blog_title').value = '';
            //     document.getElementById('blog_data').value = '';
                
            // })
        }
        xhr.open('POST','http://localhost:8081/admin/content',true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(JSON.stringify({req:'blogclass'}));
    }
    else if(hash =='#content_handle'){
        while(document.getElementById('blogtable').hasChildNodes()){
            　　　document.getElementById('blogtable').removeChild(document.getElementById('blogtable').firstChild);
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
             while(document.getElementById('blogtable').hasChildNodes()){
                　　　document.getElementById('blogtable').removeChild(document.getElementById('blogtable').firstChild);
            }
            var output = JSON.parse(xhr.responseText);
            console.log(output);            
            data_blog = output.message;
           
            document.getElementById('blogtable').innerHTML = '<tr><th>id</th><th>分类</th><th>标题</th><th>操作</th></tr>'
            for(var i in output.message){
                if(output.message[i].classify){
                    var tr = document.createElement('tr');
                    tr.setAttribute('id','blog_'+i.toString());
                    document.getElementById('blogtable').appendChild(tr);
                    document.getElementById('blog_'+i.toString()).innerHTML = '<td>'+output.message[i]._id.toString()+ '</td><td>'+ output.message[i].classify.name.toString()+ '</td><td>'+ output.message[i].title+'</td><td><a href='+"#blog-modify"+i.toString()+'>修改<a> - <a href='+"#blog-delete"+i.toString() +'>删除<a></td>';
                    document.getElementById('pic').style.left ='290px';
                }
               
            }
            document.getElementById('blogadd').style.display = 'none';
            document.getElementById('blog_mod').style.display = 'none';                       
            document.getElementById('bloghandle').style.display = 'block';
            document.getElementById('blogdelete').style.display = 'none';
            document.getElementById('bloghandle').style.opacity = 1;         
            document.getElementById('blog_del').style.display = 'none';  
            titleol.getElementsByClassName('index2')[0].style.display = 'inline-block';
            titleol.getElementsByClassName('index')[0].style.display = 'none';
            titleol.getElementsByClassName('index1')[0].style.display = 'none';
            document.getElementById('a_user').style.color = '#888';
            document.getElementById('a_class').style.color = '#888';
            document.getElementById('a_content').style.color = 'rgb(124, 169, 226)';
            document.getElementById('blogclass').style.display = 'none';    
            document.getElementById('blogcontent').style.display = 'block';
            document.getElementById('blogmod').style.display='none';                
            
            pic.style.opacity = 0.6;
            pic.style.left = '290px';
            document.getElementById('blog_del').style.display = 'none';  
        }
        xhr.open('POST','http://localhost:8081/admin/content/handle',true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(JSON.stringify({req:'bloghandle'}));
    }
    else if(hash == '#handle' ){
        document.getElementById('delclass').style.display='none';    
        document.getElementById('handleclass').style.top = 0;
        document.getElementById('handleclass').style.opacity = 1;        
        document.getElementById('handleclass').style.display = 'block';
        pic.style.opacity = 0.6;
        document.getElementById('modclass').style.display = 'none';
        document.getElementById('class_mod').style.display = 'none';
        document.getElementById('class_del').style.display = 'none';  
        titleol.getElementsByClassName('index1')[0].style.display = 'inline-block';
        titleol.getElementsByClassName('index')[0].style.display = 'none';
        titleol.getElementsByClassName('index2')[0].style.display = 'none';
        
        document.getElementById('a_class').style.color = 'rgb(124, 169, 226)';
        document.getElementById('a_user').style.color = '#888';
        document.getElementById('a_content').style.color = '#888';
        document.getElementById('blogcontent').style.display = 'none';
        document.getElementById('blogclass').style.display = 'block';
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            var output = JSON.parse(xhr.responseText);
            console.log(output);
            data_class =  output.message;
            console.log(data_class);
            document.getElementById('pic').style.left ='290px';
            while(document.getElementById('classtable').hasChildNodes()){
                　　　document.getElementById('classtable').removeChild(document.getElementById('classtable').firstChild);
            }
            document.getElementById('classtable').innerHTML = '<tr><th>分类名</th><th>id</th><th>操作</th></tr>'
            for(var i in output.message){
                var tr = document.createElement('tr');
                tr.setAttribute('id','class_'+i.toString());
                document.getElementById('classtable').appendChild(tr);
                document.getElementById('class_'+i.toString()).innerHTML = '<td>'+output.message[i].name.toString()+ '</td><td>'+ output.message[i]._id.toString()+ '</td><td><a href='+"#class-modify"+i.toString()+'>修改<a> - <a href='+"#class-delete"+i.toString() +'>删除<a></td>';
                
            }
        }
        xhr.open('POST','http://localhost:8081/admin/classify/handle',true)
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(JSON.stringify({req:'classdata'}));
    }
    for(let i in data_class){
        if(hash=='#class-modify'+i.toString()){
            // console.log(hash);
            //先呈现一个修改框
            //发请求到后台 ,修改分类名称
            document.getElementById('delclass').style.display='none';                            
            document.getElementById('class_mod').style.display = 'inline';
            document.getElementById('class_del').style.display = 'none';           
            document.getElementById('modclass').style.display='block';
            document.getElementById('delclass').style.display='none';            
            document.getElementById('handleclass').style.display = 'none';
            pic.style.left = '367px';
            document.getElementById('modclass_ip1').value = data_class[i].name;
            document.getElementById('re_name').addEventListener('click',function(){
                var xhr = new XMLHttpRequest();
                xhr.onload = function(){
                    var output = JSON.parse(xhr.responseText);
                    console.log(output);
                    document.getElementsByClassName('show')[1].style.display = 'block';  
                    document.getElementsByClassName('show')[1].innerHTML = output.message.toString();   
                    window.location.hash = '#handle';
                    
                }
                xhr.open('POST','http://localhost:8081/admin/classify/modify',true)
                xhr.setRequestHeader("Content-type","application/json");
                var name = document.getElementById('modclass_ip2').value;
                var id = data_class[i]._id;
                if(name){
                    var index = 0;
                    for(var a = 0; a < data_class.length;a++){
                        if(data_class[a].name == name){
                            index = 1;
                        }
                    }
                    if(data_class[i].name == name){
                        document.getElementsByClassName('show')[1].innerHTML = '修改成功';
                    document.getElementsByClassName('show')[1].style.display = 'block';        
                        
                    }else if(index==1){
                        document.getElementsByClassName('show')[1].innerHTML = '该类名已经被占用啦';
                        document.getElementsByClassName('show')[1].style.display = 'block';        
                    }else{
                        xhr.send(JSON.stringify({name:name,oldname:document.getElementById('modclass_ip1').value}));
                    }
                }else{
                    document.getElementsByClassName('show')[1].innerHTML = '分类名不能为空';
                    document.getElementsByClassName('show')[1].style.display = 'block';        
                }
                setTimeout(() => {
                    document.getElementsByClassName('show')[1].style.display = 'none';
                }, 3000);
               
            })
        }
       
        else if(hash=='#class-delete'+i.toString()){
            document.getElementById('class_mod').style.display = 'none';
            document.getElementById('class_del').style.display = 'inline';           
            document.getElementById('modclass').style.display='none';
            document.getElementById('delclass').style.display='block';                
            document.getElementById('handleclass').style.opacity = 0.4;
            pic.style.opacity = 0.3;
            pic.style.left = '367px';
            document.getElementById('handleclass').style.position = 'relative';
            document.getElementById('handleclass').style.top = '-200px';
            document.getElementById('del_index').innerHTML = data_class[i].name;
            delname = document.getElementById('del_index').innerHTML;
            var name = document.getElementById('del_index').innerHTML;            
            document.getElementById('del_yes').onclick = function(){
                var xhr = new XMLHttpRequest();
                xhr.onload = function(){
                   console.log(JSON.parse(xhr.responseText));
                   window.location.hash = '#handle';  
                }
                xhr.open('POST','http://localhost:8081/admin/classify/delete',true)
                xhr.setRequestHeader("Content-type","application/json");
                xhr.send(JSON.stringify({name:delname}));
                
            }
                           
            
            return;
        }
    }
    for(let i in data_blog){
        if(hash=='#blog-modify'+i.toString()){
            document.getElementById('blog_del').style.display = 'none';           
            document.getElementById('blog_mod').style.display = 'inline';           
            document.getElementById('blogmod').style.display='block';                
            pic.style.left = '367px';
            document.getElementById('delclass').style.display='block';                
            document.getElementById('bloghandle').style.display = 'none';
            var mod_id = data_blog[i]._id;            
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                var output = JSON.parse(xhr.responseText);
                console.log(output);
                while(document.getElementById('blog-type').hasChildNodes()){
                    　　　document.getElementById('blog-type').removeChild(document.getElementById('blog-type').firstChild);
                }
                for(let i in output.message){
                    document.getElementById('blog-type').innerHTML+='<option value='+output.message[i]._id+'>'+output.message[i].name+'</option>';
                }
                for(let i = 0; i< output.message.length; i++){
                    if(output.message[i]._id == output.classify){
                        document.getElementById("blog-type")[i].selected=true;
                    }
                }
                document.getElementById('blog-data').value = output.content;
                document.getElementById('blog-title').value = output.title;
                
            }
            xhr.open('POST','http://localhost:8081/admin/content/change_id',true);
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send(JSON.stringify({id:mod_id}));
     
            
        }
        else if(hash=='#blog-delete'+i.toString()){
            document.getElementById('blog_del').style.display = 'inline';  
            document.getElementById('blog_mod').style.display = 'none';           
            document.getElementById('blogdelete').style.display='block';                
            document.getElementById('bloghandle').style.opacity = 0.4;
            pic.style.opacity = 0.2;
            pic.style.left = '367px';
            document.getElementById('delName').innerHTML = data_blog[i].title;
            var del_id = data_blog[i]._id;
            document.getElementById('delYes').addEventListener('click',function(){
                let xhr = new XMLHttpRequest();
                xhr.onload = function(){
                    let output = JSON.parse(xhr.responseText);
                    console.log(output);
                    window.location.hash = '#content_handle';                    
                    
                }
                xhr.open('POST','http://localhost:8081/admin/content/delete',true);
                xhr.setRequestHeader("Content-type","application/json");
                xhr.send(JSON.stringify({id:del_id}));
            })
            
            return;
        }
    }

    




   
})
console.log('hello about');
