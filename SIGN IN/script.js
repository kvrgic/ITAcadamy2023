/* array of users*/
var users = [
    {
        name: 'Aida Kvrgic',
        email: 'kvrgicaida95@gmail.com',
        address: 'Trg Heroja 39',
        username: 'Aida123!',
        password: '123456',   
    },
]

function getValue(id){
    return document.getElementById(id).value;
}

var signinform = document.getElementById('signin-form');
signinform.style.display = 'block';
var signupform = document.getElementById('signup-form');
signupform.style.display = 'none';
var navigation = document.getElementById('nav');
var showEmail = document.querySelector('.show-name');
var incorectMess = document.getElementById('incorect-mess');

function signIn(){
    var email = getValue('email-input');
    var password = getValue('password-input');

    for(var oneUser of users){
        if((email === oneUser.email || email === oneUser.username) && password === oneUser.password){
            signinform.style.display = 'none';
            navigation.style.display = 'block'
            showEmail.innerHTML = oneUser.name;
            clearValue('email-input');
            clearValue('password-input');
        }else{
            incorectMess.style.display = 'block';
        }
    } 
}

function signOut(){
    navigation.style.display = 'none';
    signinform.style.display = 'block';
    incorectMess.style.display = 'none';

    clearValue('blog-title');
    clearValue('blog-story');
}

function goToSignUpForm(){
    signinform.style.display = 'none';
    signupform.style.display = 'block';
}
function goToSignInForm(){
    signinform.style.display = 'block';
    signupform.style.display = 'none';
}

function signUp(){
    var name = getValue('r-name-input');
    var email = getValue('r-email-input');
    var address = getValue('r-address-input');
    var username = getValue('r-username-input');
    var password = getValue('r-password-input');

    if(name === '' || email === '' || address === '' || username === '' || password === ''){
        return alert('Unesite sve podatke!')
    };
    var user = {
        name, 
        email,
        address, 
        username, 
        password
    };
    users.push(user);
    clearValue('r-name-input');
    clearValue('r-email-input');
    clearValue('r-address-input');
    clearValue('r-username-input');
    clearValue('r-password-input');
    goToSignInForm()
}
function clearValue(id){
    document.getElementById(id).value = '';
}
function enterSignIn(event){
    if(event.keyCode === 13){
        signIn();
    }
}
function regBackToSignIn(event){
    if(event.keyCode === 13){
        signUp();
    }
}

function postNewBlog(){
    var postBlog = document.querySelector('.post-blog');
    var titleOfBlog = getValue('blog-title')
    var storyOfBlog = getValue('blog-story');

    
    if(titleOfBlog === '' || storyOfBlog === ''){
        return alert('Unesite sve podatke!')
    }
    var newPost = document.createElement('div')
    newPost.classList.add('new-post');
    
    var postTitle = document.createElement('h1');
    postTitle.classList.add('post-title');
    postTitle.innerHTML = titleOfBlog;

    var postStory = document.createElement('p');
    postStory.classList.add('post-story');
    postStory.innerHTML = storyOfBlog;

    var date = document.createElement('p');
    var newDate = new Date();
    date.classList.add('post-date');
    date.innerHTML = 'Posted: '+ newDate.toLocaleString("en-us", {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: "2-digit"});
    
    newPost.appendChild(postTitle);
    newPost.appendChild(postStory);
    newPost.appendChild(date);
    postBlog.appendChild(newPost);

    clearValue('blog-title');
    clearValue('blog-story');
}