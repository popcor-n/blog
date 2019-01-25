import css from './app.css';

console.log('hello world');
var reg = document.getElementById('register');
reg.getElementsByTagName('button')[0].addEventListener('click',function(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:8081/api/user/register',true);
    var json = {
        'username':document.getElementsByClassName('user')[0].value,
        'password':document.getElementsByClassName('pass')[0].value,
        'rePassword':document.getElementsByClassName('rePass')[0].value 
    }
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(json));
    // console.log(document.getElementsByClassName('username')[0].value);
    console.log(xhr.responseText);
})
