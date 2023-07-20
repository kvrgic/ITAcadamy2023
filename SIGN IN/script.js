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
    var loggedUserData = localStorage.getItem('loggedUser');

    if(loggedUserData){
        var user = JSON.parse(loggedUserData)
        signIn(user.email, user.password);
    }
}
isUserLogged();

/* Sign in function */
function signIn(p_email,p_password){
    var email = p_email || getValue('email-input');
    var password = p_password|| getValue('password-input');

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
    displayBlog();
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
    clearValue('search-blog');
    clearValue('write-comment');
}

/* Function on button SIGNUP - go to sign up form*/
function goToSignUpForm(){
    var signinform = document.getElementById('signin-form');
    var signupform = document.getElementById('signup-form');

    signinform.style.display = 'none';
    signupform.style.display = 'block';

    clearValue('email-input');
    clearValue('password-input');
}

/* Function on button SIGNIN - go to sign in form*/
function goToSignInForm(){
    var signinform = document.getElementById('signin-form');
    var signupform = document.getElementById('signup-form');

    signinform.style.display = 'block';
    signupform.style.display = 'none';

    clearValue('r-name-input');
    clearValue('r-email-input');
    clearValue('r-address-input');
    clearValue('r-username-input');
    clearValue('r-password-input');
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
        signIn();
    }
}
function regBackToSignIn(event){
    if(event.keyCode === 13){
        signUp();
    }
}

/* function on button POST BLOG, get title and blog story value, push value in blog object, push object in allBlogs array, call displayBlogs function and clear title and blog story input*/
function postNewBlog(){
    var titleOfBlog = getValue('blog-title');
    var storyOfBlog = getValue('blog-story');

    if(titleOfBlog === '' || storyOfBlog === ''){
        return alert('Unesite sve podatke!')
    }

    var blog = {
        titleOfBlog,
        storyOfBlog,
        blogDate: new Date(),
        author:loggedUser.name,
        comments: []
    };

    allBlogs.push(blog);
    localStorage.setItem('allBlogs', JSON.stringify(allBlogs));

    displayBlog();

    clearValue('blog-title');
    clearValue('blog-story');
}

/* Get local storage information and allBlogs array = that information.  */
function displayBlog(){
    var blogsData = localStorage.getItem('allBlogs');
    if(blogsData){
        allBlogs = JSON.parse(blogsData);
    }
    renderBlogs(allBlogs);
}

/*div element from the html and clean div, use one blog of the allBlogs array, create a new div for the post, title, post story, date and name of user posting the blog, appendChild to the html div, and  call showComments function, apend delete button and append addComment area*/ 
function renderBlogs(blogs){
    blogs.sort((a,b) => new Date(b.blogDate) - new Date(a.blogDate));
    var displayBlogs = document.querySelector('.posted-blog');
    displayBlogs.innerHTML = '';
    for(var blog of blogs){
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
        dateAndName.innerHTML =`Posted: `+ new Date(blog.blogDate).toLocaleString("pt-PT") + ', Author: ' + blog.author;

        newPost.appendChild(addDeleteBtn(blog))
        newPost.appendChild(postTitle);
        newPost.appendChild(postStory);
        newPost.appendChild(dateAndName);

        displayBlogs.appendChild(newPost);
        showComments(blog.comments);
        displayBlogs.appendChild(addComment(blog)); 
    }
}

/* Get and clead displayBlogs area, use value of input searchText, create empty array filtereBlogs, iterate allBlogs, and push in filtereBlog array, call RenderBlogs function*/
function searchBlogs(){
    var displayBlogs = document.querySelector('.posted-blog');
    displayBlogs.innerHTML = '';

    var searchText = document.getElementById('search-blog').value.toUpperCase();
    
    var filtereBlogs = [];
    for(var blog of allBlogs){
        var allTitle = blog.titleOfBlog.toUpperCase();
        var allText = blog.storyOfBlog.toUpperCase();
        if(allTitle.includes(searchText) || allText.includes(searchText)){
            filtereBlogs.push(blog);
        }
    }
    renderBlogs(filtereBlogs);
}

/* Function addComent, created comment object and push in allBlogs object */
function addComment(blog){
    var divComment = document.createElement('div');
    divComment.classList.add('post-comment');

    var inputComment = document.createElement('input');
    inputComment.placeholder = 'Write a comment';
    inputComment.classList.add('input-comment');
    inputComment.addEventListener('keyup', function(e){
        var commentText = e.target.value;
        if(e.keyCode !== 13) return;
        
        var comment = {
            commentText,
            author: loggedUser.name,
            postedDate: new Date(),
        };
        if(!blog.comments){
            blog.comments = [];
        }
        blog.comments.push(comment);
        localStorage.setItem('allBlogs', JSON.stringify(allBlogs));     
        inputComment.value = '';

        renderBlogs(allBlogs);
    });

    divComment.appendChild(inputComment);

    return divComment
}
/* Show comment on displey */
function showComments(comments){
    var displayBlogs = document.querySelector('.posted-blog');

    for(var comment of comments){
        if(!comment) return;
        var divComment = document.createElement('div')
        divComment.classList.add('post-comment');
        divComment.classList.add('border-comment');
        var commentLine = document.createElement('hr');
        commentLine.style = 'width: 50%; margin: 0 auto; border:1px solid #e85f83';

        var commentText = document.createElement('p');
        commentText.classList.add('post-story');
        commentText.innerHTML = comment.commentText;

        var dateAndName = document.createElement('p');
        dateAndName.classList.add('post-date');
        dateAndName.innerHTML = new Date(comment.postedDate).toLocaleString("pt-PT") +`, `+ comment.author + ' says: ' ;
        dateAndName.style.textAlign = 'left'

        divComment.appendChild(dateAndName);
        divComment.appendChild(commentText);
        divComment.appendChild(commentLine);

        displayBlogs.appendChild(divComment);
    }
}

/* Delete button function */
function addDeleteBtn(blog){
    var buttonDelete = document.createElement('button');
    buttonDelete.classList.add('delete-btn');
    buttonDelete.innerHTML = 'X';
    buttonDelete.style.display = loggedUser.name === blog.author ? 'block' : 'none';
    buttonDelete.addEventListener('click', function(){
        if(blog.author === loggedUser.name){
            var blogIndex = allBlogs.indexOf(blog);
            var response = confirm('Are you sure?');
            if(!response) return;
            allBlogs.splice(blogIndex, 1);
            localStorage.setItem('allBlogs', JSON.stringify(allBlogs));
            displayBlog();
        }
    });
    return buttonDelete;
}