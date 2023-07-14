/* Array of users*/
var users = [
    {
        name: 'Aida Kvrgic',
        email: 'kvrgicaida95@gmail.com',
        address: 'Trg Heroja 39',
        username: 'Aida123!',
        password: '123456',   
    },
]

/* Array - all posted blogs*/
var allBlogs = [];

/* Logged user */
var loggedUser = {};

/* Function for get value and clear value of element */
function getValue(id){
    return document.getElementById(id).value;
}
function clearValue(id){
    document.getElementById(id).value = '';
}

/* If user logged - exists in localStorage, when we refresh the page - user stay logged */
function isUserLogged(){
    var userData = localStorage.getItem('loggedUser');

    if(userData){
        signIn(JSON.parse(userData));
    }
}
isUserLogged();

/* Sign in function */
function signIn(user){
    var email = user.email || getValue('email-input');
    var password = user.password || getValue('password-input');

    var signinform = document.getElementById('signin-form');
    var navigation = document.getElementById('nav');
    var showEmail = document.querySelector('.show-name');
    var incorectMess = document.getElementById('incorect-mess');

    /* Get data from the local storage */
    var usersData = localStorage.getItem('users');
    if(usersData){
        users = JSON.parse(usersData)
    }

    for(var oneUser of users){
        if((email === oneUser.email || email === oneUser.username) && password === oneUser.password){
            signinform.style.display = 'none';
            navigation.style.display = 'block'

            loggedUser = oneUser;
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            
            showEmail.innerHTML = loggedUser.name;
            clearValue('email-input');
            clearValue('password-input');
        }else{
            incorectMess.style.display = 'block';
        }
    } 
}

/* Sign out function*/
function signOut(){
    var navigation = document.getElementById('nav');
    var signinform = document.getElementById('signin-form');
    var incorectMess = document.getElementById('incorect-mess');

    navigation.style.display = 'none';
    signinform.style.display = 'block';
    incorectMess.style.display = 'none';

    localStorage.removeItem('loggedUser');

    clearValue('blog-title');
    clearValue('blog-story');
}

/* Function on button SIGNUP - go to sign up form*/
function goToSignUpForm(){
    var signinform = document.getElementById('signin-form');
    var signupform = document.getElementById('signup-form');

    signinform.style.display = 'none';
    signupform.style.display = 'block';
}

/* Function on button SIGNIN - go to sign in form*/
function goToSignInForm(){
    var signinform = document.getElementById('signin-form');
    var signupform = document.getElementById('signup-form');

    signinform.style.display = 'block';
    signupform.style.display = 'none';
}

/* User ragistration, get input value, push to users array and local storage, clear input value, and call function goToSignInForm */
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
    localStorage.setItem('users', JSON.stringify(users))

    clearValue('r-name-input');
    clearValue('r-email-input');
    clearValue('r-address-input');
    clearValue('r-username-input');
    clearValue('r-password-input');
    goToSignInForm()
}

/* Function on all signIn or signUp input - logged or registration with enter key */
function enterSignIn(event){
    if(event.keyCode === 13){
        signIn({});
    }
}
function regBackToSignIn(event){
    if(event.keyCode === 13){
        signUp();
    }
}

/* function on button POST BLOG, get title and blog story value, push value in blog object, push object in allBlogs array, call displayBlogs function and clear title and blog story input*/
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

/* Get div element from the html and clean div, use one blog of the allBlogs array, create a new div for the post, title, post story, date and name of user posting the blog, appendChild to the html div */
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