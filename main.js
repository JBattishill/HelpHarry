//DOG CALL from https://docs.thedogapi.com/ ==========================================================================================================
function getDoggo(){
fetch('https://api.thedogapi.com/v1/images/search').then(response => response.json())
.then(response => {
    console.log(response);

    //api call that we want to show
    const doggo = response[0].url;

    //select html on the page
    const select = document.getElementById('doggo');
    //update html with api data
    select.style.backgroundImage = "url('" + doggo + "')";
}
    
    )
.catch(err => console.error(err));
}
  

function startRaveParty(){
  document.getElementById("soundo").classList.add("raveParty");
  document.getElementById("quoto").classList.add("raveParty");
  document.getElementById("giffo").classList.add("raveParty");
  document.getElementById("doggo").classList.add("raveParty");
  document.getElementById("heado").classList.add("raveParty");
  document.getElementById("navo").classList.add("raveParty");
  document.getElementById("bodyo").classList.add("raveParty");

  window.scrollBy(0, 500);

  setTimeout(() => {
    endRaveParty();
  }, 8000);
}

function endRaveParty(){
  document.getElementById("soundo").classList.remove("raveParty");
  document.getElementById("quoto").classList.remove("raveParty");
  document.getElementById("giffo").classList.remove("raveParty");
  document.getElementById("doggo").classList.remove("raveParty");
  document.getElementById("heado").classList.remove("raveParty");
  document.getElementById("navo").classList.remove("raveParty");
  document.getElementById("bodyo").classList.remove("raveParty");
}

function startNewMusic(){
    document.getElementById("newMusic").classList.remove("hidden");
    document.getElementById("soundo").classList.add("raveParty");
    window.scrollBy(0, 500);

    setTimeout(() => {
      endNewMusic();
    }, 8000);
}

function endNewMusic(){
  document.getElementById("newMusic").classList.add("hidden");
  document.getElementById("soundo").classList.remove("raveParty");
}



//NEXT

//can also use .innerHTML
// document.getElementById('advice').innerHTML += '<p>test</p>';

// when looking at answers need JAVASCRIPT NOT JQUERY




//ORIGINAL ADVICE JS ========================================================================================================================================
//ADVICE CALL FROM https://api.adviceslip.com/
// const resDiv = document.querySelector('#results');
// const resBtn = document.querySelector('#getData');



// resBtn.addEventListener('click', () => {
//   getAdvice();
// });

// window.onload = () => {
//   getAdvice();
// };



// function getAdvice() {

//   fetch('	https://api.adviceslip.com/advice').then(response => {
//     return response.json();
//   }).then(adviceData => {
//     const Adviceobj = adviceData.slip;
//     resDiv.innerHTML = `<p>${Adviceobj.advice}</p>`;
//   }).catch(error => {
//     console.log(error);
//   });

// }

function loading(){
  getQuoto();
  getDoggo();
}


// QUOTE JS ========================================================================================================================================
function getQuoto(){
var quote = document.getElementById("quote");
var author = document.getElementById("author");
var btn = document.getElementById("btn");

const url = "https://api.quotable.io/random";

// let getQuote = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      quote.innerText = item.content;
      author.innerText = item.author;
    });
};
// window.addEventListener("load", getQuote);
// btn.addEventListener("click", getQuote);
// }



//GIF JS =========================================================================================================================================
var api = 'https://api.giphy.com/v1/gifs/random?';
var apiKey = 'api_key=U96g4osMHY2nW7ZQrhg0YIsPCANziiTL';
// var query = '&q=cat+dog';
var query = '&tag=&rating=g';

let gif = document.getElementById("gifContainer");

https://api.giphy.com/v1/gifs/random?api_key=U96g4osMHY2nW7ZQrhg0YIsPCANziiTL&tag=&rating=g

function setup() {
  //noCanvas();
  var url = api + apiKey + query;
  console.log(url);
  loadJSON(url, gotData);
}

function gotData(giphy) {
    console.log(giphy);
  for (var i = 0; i < giphy.data.length; i++) {
    createImg(giphy.data[i].images.original.url);
  }
  var image = giphy.data.images.fixed_height.url;
  console.log(image);

  var gifStr = "<img src='" + image + "' alt='gif' >";

  console.log(gifStr);

  gif.innerHTML = gifStr
  
}
