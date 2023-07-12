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

var allBlogs = [];

var loggedUser = {};

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
            loggedUser = oneUser;
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
    var titleOfBlog = getValue('blog-title')
    var storyOfBlog = getValue('blog-story');

    if(titleOfBlog === '' || storyOfBlog === ''){
        return alert('Unesite sve podatke!')
    }

    var blog = {
        titleOfBlog,
        storyOfBlog,
        blogDate: new Date(),
        author:loggedUser.name
    };

    allBlogs.push(blog);
    displayBlog();

    clearValue('blog-title');
    clearValue('blog-story');
}

function displayBlog(){
    var displayBlogs = document.querySelector('.posted-blog');
    displayBlogs.innerHTML = '';

    for(var blog of allBlogs){
        var newPost = document.createElement('div')
        newPost.classList.add('new-post');

        var postTitle = document.createElement('h1');
        postTitle.classList.add('post-title');
        postTitle.innerHTML = blog.titleOfBlog;

        var postStory = document.createElement('p');
        postStory.classList.add('post-story');
        postStory.innerHTML = blog.storyOfBlog;

        var dateAndName = document.createElement('p');
        dateAndName.classList.add('post-date');
        dateAndName.innerHTML ='Posted: '+ blog.blogDate.toLocaleString("en-us", {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: "2-digit"}) + ', Author: '+ blog.author;

        newPost.appendChild(postTitle);
        newPost.appendChild(postStory);
        newPost.appendChild(dateAndName);
        displayBlogs.appendChild(newPost);
    } 
}