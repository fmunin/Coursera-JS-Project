window.onload =startUp;
//global objects
let api_json = null ;//will store api data]
const url_api="./travel_Recommendation_api.json";

function startUp(){
    doAttachEvents();
    //future- this ASYNC/AWAIT thing is confusing,
    //the function is tagged as async,
    //there's an await WITHIN the function
    //the returned valued CONSOLE.LOGS as expected (as a JSON object) within function
    //BUT
    //when called it returns a promise, NOT A JSON object as expected
    //for now using THEN WORKS but should probably be refactored
    loadJSON(url_api).then((data) => api_json = data);
   
}

function doAttachEvents(){
    let btn = document.getElementById('SearchBtn');
    btn.addEventListener('click', searchBtn_click);
    btn = document.getElementById('ClearBtn');
    btn.addEventListener('click', clearBtn_click);
    
}

function searchBtn_click(){    
    srchString = document.getElementById('SearchEdit').value;
    //alert('Search for ' + srchEdit.value);
    searchLocation(srchString.toLowerCase());
}

function clearBtn_click(){
    document.getElementById('SearchEdit').value='';
    let div = document.getElementById('searchResults');
    div.replaceChildren() ; //remove all children
}

async function loadJSON(url){
 //LOADS JSON from given url 
 const response = await fetch(url);
 const data = await response.json();
 return data ;
}

function searchLocation(srchString){
    let targetArray = api_json[srchString] ;
    result = createList(targetArray);
   let div = document.getElementById('searchResults');
   div.replaceChildren() ; //remove all children
   div.appendChild(result);
}

function createList(LocationArray){
 let htmlList = document.createElement('ul');
 htmlList.setAttribute('class','list-unstyled location');
 let item = null ; //placeholder for list item
 for(var index = 0 ; index<LocationArray.length; index++){
    let localLocation = LocationArray[index] ;
    item = document.createElement('li');
    item.appendChild(createIMG(localLocation['imageUrl']));
    item.appendChild(createTitle(localLocation['name']));
    item.appendChild(createDesc(localLocation['description']));
    htmlList.appendChild(item);
 }
 return htmlList ; 
 }  

 function createIMG(url){
    let result = document.createElement('img');
    result.setAttribute('src',url);
    result.className = "img-fluid" ; //bootstrap image size
    return result ;
 }


 function createTitle(locTitle){
    let result = document.createElement('h2');
    result.setAttribute('class','locationTitle display-5');
    result.appendChild(document.createTextNode(locTitle));
    return result ;
 }

 function createDesc(locDesc){
    let result = document.createElement('p');
    result.setAttribute('class','locationDesc');
    result.appendChild(document.createTextNode(locDesc));
    return result ;
 }

