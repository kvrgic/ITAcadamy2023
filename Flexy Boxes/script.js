
function getProperty(name){
    
    var property = document.getElementsByName(name);
    property = property[0].value;
    return property;
}
function displayOption(){
    var mainDiv = document.getElementById('main-div');
    mainDiv.style.display = getProperty('display');
}
function flexDirectionOption(){
    var main = document.querySelector('.main');
    var mainDiv = document.getElementById('main-div');
    
    mainDiv.style.flexDirection =  getProperty('flex-direction');
    main.setAttribute('data-flex-direction', getProperty('flex-direction'))
}

function flexWrapOption(){
    var mainDiv = document.getElementById('main-div');    
    mainDiv.style.flexWrap =  getProperty('flex-wrap');
}

function justifyContentOption(){
    var mainDiv = document.getElementById('main-div');    
    mainDiv.style.justifyContent = getProperty('justify-content');
}

function alignItemsOption(){
    var mainDiv = document.getElementById('main-div');    
    mainDiv.style.alignItems =  getProperty('align-items');
}

function alignContentOption(){
    var mainDiv = document.getElementById('main-div');
    mainDiv.style.alignContent=  getProperty('align-content');
}


function changeDiv(index){
    var divElement = document.getElementsByClassName('flex-item');
    divElement = divElement[index]
    var order = document.getElementsByName('order[]');
    order = order[index].value;
    var flexGrow = document.getElementsByName('flex-grow[]');
    flexGrow = flexGrow[index].value;
    var flexShrink = document.getElementsByName('flex-shrink[]');
    flexShrink = flexShrink[index].value;
    var flexBasic = document.getElementsByName('flex-basic[]');
    flexBasic = flexBasic[index].value;
    var alignSelf = document.getElementsByName('align-self[]');
    alignSelf = alignSelf[index].value

    divElement.style.order = order;
    divElement.style.flexGrow = flexGrow;
    divElement.style.flexShrink = flexShrink;
    divElement.style.flexBasic = flexBasic;
    divElement.style.alignSelf = alignSelf;
    
    return divElement
}

function changeDivNth1(){
    changeDiv(0);
}
function changeDivNth2(){
    changeDiv(1);
}
function changeDivNth3(){
    changeDiv(2);
}
