var user = {
    email: 'kvrgicaida95@gmail.com',
    password: '123456'
}

var signinform = document.getElementById('signin-form');
var navigation = document.getElementById('nav');
var showEmail = document.querySelector('.show-email');
var incorectMess = document.getElementById('incorect-mess');

function signIn(){
    var username = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;

    if(username === user.email && password === user.password){
        signinform.style.display = 'none';
        navigation.style.display = 'block'
        showEmail.innerHTML = user.email;
    }else{
        incorectMess.style.display = 'block';
    }
}

function signOut(){
    navigation.style.display = 'none';
    signinform.style.display = 'block';
    incorectMess.style.display = 'none';
}