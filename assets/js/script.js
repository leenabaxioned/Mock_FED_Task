/* Author: */
// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDRiOTI2Y2YwNWI2MWE2ZWNkYTI5MzUxN2JjYTIyYSIsInN1YiI6IjY2NjE1ZmVlY2M1MTU5OTAyZTNmM2YyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._zrwkv2xSNLId6SxggHgaNv81o_8pGsMSRymbcer3cI'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      // Get username and password from the form
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Static credentials (replace with actual credentials)
      const staticUsername = "user";
      const staticPassword = "password@123";
  
      // Check if the entered credentials match the static credentials
      if (username === staticUsername && password === staticPassword) {
        // If credentials match, set login state in local storage
        localStorage.setItem("isLoggedIn", true);
        // Redirect to homepage or any other authenticated page
        window.location.href = "homepage.html";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });
  });

  // scripts.js
document.addEventListener("DOMContentLoaded", function() {
  // Logic for handling logout
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", function(event) {
    event.preventDefault();
    // Clear login state from local storage
    localStorage.removeItem("isLoggedIn");
    // Redirect to login page
    window.location.href = "login.html";
  });

  // Check if user is logged in, if not redirect to login page
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }

});

// Top Rated Movies API starts here-------------------------------------------
var Get_API_URL = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

var main = document.querySelector("#main");
var form = document.querySelector(".search-box");
var search = document.querySelector("#search");

// get movies
getMovies(Get_API_URL);

// async function for fetching API response
async function getMovies(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies(data.results);
}

// showMovies function to display data
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    var { title, poster_path, vote_average, overview, backdrop_path} = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute('id', movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
    <a href="#FIXME" title="Movie Details">
            <figure><img src="${IMG_PATH + poster_path}" alt="${title}"></figure>
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          <p class="overview-info">${overview}<p>
        </div>
        </a>
        `;

    main.appendChild(movieEl);

    movieEl.onclick = (id) =>{
      console.log(id.currentTarget);
      var idCurrent = id.currentTarget;
      idCurrent.addEventListener("click",function(){
        idCurrent.innerHTML = `
       <figure><img src="${IMG_PATH + backdrop_path}" alt="${title}"></figure>
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          <p class="overview-info">${overview}<p>
        </div>
        `
      })
    }
  
  });
}

// getClassByRate function to change fontcolor acording movie rating
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// search input click event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var searchTerm = search.value.toLowerCase();
  console.log(searchTerm);
  var SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchTerm}"`
 
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API);
    search.value = "";
  } else {
    window.location.reload();
  }
});
// Top rated Movies API ends here-------------------------------------------

// // Popular Rated Movies API starts here-------------------------------------------
// var Popular_API_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
// var IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

// var popularMain = document.querySelector("#popular-movies");

// // get movies
// getMovies(Popular_API_URL);

// // showMovies function to display data
// function showMovies(popmovies) {
//   popularMain.innerHTML = "";

//   popmovies.forEach((movie) => {
//     var { title, poster_path, vote_average, overview} = movie;
//     var movieEl = document.createElement("li");
//     movieEl.setAttribute('id', movie.id);
//     movieEl.classList.add("movie");
//     movieEl.classList.add("slide-item");

//     movieEl.innerHTML = `
//     <a href="#FIXME" title="Movie Details">
//             <figure><img src="${IMG_PATH + poster_path}" alt="${title}"></figure>
//             <div class="movie-info">
//           <h3>${title}</h3>
//           <span class="${getClassByRate(vote_average)}">${vote_average}</span>
//             </div>
//             <div class="overview">
//           <h3>Overview</h3>
//           <p class="overview-info">${overview}<p>
//         </div>
//         </a>
//         `;

//     popularMain.appendChild(movieEl);
//   });
// }
// // Popular Movies API ends here-------------------------------------------

// // Now Playing Movies API starts here-------------------------------------------
// var Playing_API_URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
// var IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

// var nowplayingMain = document.querySelector("#nowplaying-movies");

// // get movies
// getMovies(Playing_API_URL);

// // showMovies function to display data
// function showMovies(popmovies) {
//   nowplayingMain.innerHTML = "";

//   popmovies.forEach((movie) => {
//     var { title, poster_path, vote_average, overview} = movie;
//     var movieEl = document.createElement("li");
//     movieEl.setAttribute('id', movie.id);
//     movieEl.classList.add("movie");
//     movieEl.classList.add("slide-item");

//     movieEl.innerHTML = `
//     <a href="#FIXME" title="Movie Details">
//             <figure><img src="${IMG_PATH + poster_path}" alt="${title}"></figure>
//             <div class="movie-info">
//           <h3>${title}</h3>
//           <span class="${getClassByRate(vote_average)}">${vote_average}</span>
//             </div>
//             <div class="overview">
//           <h3>Overview</h3>
//           <p class="overview-info">${overview}<p>
//         </div>
//         </a>
//         `;

//     nowplayingMain.appendChild(movieEl);
//   });
// }
// // Now Playing Movies API ends here-------------------------------------------

// // Upcoming Movies API starts here-------------------------------------------
// var Upcoming_API_URL = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
// var IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

// var upcomingMain = document.querySelector("#upcoming-movies");

// // get movies
// getMovies(Upcoming_API_URL);

// // showMovies function to display data
// function showMovies(popmovies) {
//   upcomingMain.innerHTML = "";

//   popmovies.forEach((movie) => {
//     var { title, poster_path, vote_average, overview} = movie;
//     var movieEl = document.createElement("li");
//     movieEl.setAttribute('id', movie.id);
//     movieEl.classList.add("movie");
//     movieEl.classList.add("slide-item");

//     movieEl.innerHTML = `
//     <a href="#FIXME" title="Movie Details">
//             <figure><img src="${IMG_PATH + poster_path}" alt="${title}"></figure>
//             <div class="movie-info">
//           <h3>${title}</h3>
//           <span class="${getClassByRate(vote_average)}">${vote_average}</span>
//             </div>
//             <div class="overview">
//           <h3>Overview</h3>
//           <p class="overview-info">${overview}<p>
//         </div>
//         </a>
//         `;

//     upcomingMain.appendChild(movieEl);
//   });
// }
// // Upcoming Movies API ends here-------------------------------------------

// Slider function for API data
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let next_previous = document.querySelector(".next-previous");
let slider = document.querySelector(".slide-list");
let count = 0;
function slideImg(count) {
  if (count >-1360 && count < 0) {
    if (count < 0) {
      previous.style.visibility = "visible";
    }
   if (count > -1360) {
      next.style.visibility = "visible";
    }
  } else {
    if (count >= 0) {
      previous.style.visibility = "hidden";
    } else if (count<=-1360) {
      next.style.visibility = "hidden";
    }
  }
}
previous.addEventListener("click", () => {
  count = count + 120;
  slideImg(count);
  slider.style.transform = `translateX(${count}px)`;
  console.log(count);
});
next.addEventListener("click", () => {
  count = count - 120;
  slideImg(count);
  slider.style.transform = `translateX(${count}px)`;
  console.log(count);
});
slideImg(count);

// details id code
// var movieli = document.querySelectorAll(".movie");
// console.log(movieli);
// movieli.forEach(ele => {

// console.log(ele)
// ele.addEventListener("click",function(){
//   console.log(this);
// })
// })

var body = document.querySelector("body");
body.addEventListener("load",function() {
  history.replaceState(null, null, document.URL);

  // Handle the popstate event to keep replacing the state
  window.onpopstate = function(event) {
      history.replaceState(null, null, document.URL);
  };
})