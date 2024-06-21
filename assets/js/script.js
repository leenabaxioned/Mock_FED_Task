/* Author: */
// Login Function starts
document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Static credentials (replace with actual credentials)
    var staticUsername = "user";
    var staticPassword = "password@123";

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
// Login Function starts

// Logout function starts
document.addEventListener("DOMContentLoaded", function () {
  // Logic for handling logout
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Clear login state from local storage
    localStorage.removeItem("isLoggedIn");
    // Redirect to login page
    window.location.href = "login.html";
  });

  // Check if user is logged in, if not redirect to login page
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
});
// Logout function ends

// Top Rated Movies API starts here-------------------------------------------
var Get_API_URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var main = document.querySelector("#main");
var form = document.querySelector(".search-box");
var search = document.querySelector("#search");

// https://api.themoviedb.org/3/movie/${movie.id}?api_key=8d4b926cf05b61a6ecda293517bca22a

// get movies
getMovies1(Get_API_URL);

// async function for fetching API response
async function getMovies1(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies1(data.results);
}

// showMovies function to display data
function showMovies1(movies) {
  console.log("movies:", movies);
  main.innerHTML = "";

  movies.forEach((movie) => {
    var { title, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
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
  var MovieSearch_API = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchTerm}"`;
  var TVSearch_API = `https://api.themoviedb.org/3/search/tv?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchTerm}`;
  if (searchTerm && searchTerm !== "") {
    getMovies1(MovieSearch_API);
    getMovies2(MovieSearch_API);
    getMovies3(MovieSearch_API);
    getMovies4(MovieSearch_API);
    getMovies5(MovieSearch_API);
    getMovies6(TVSearch_API);
    getMovies7(TVSearch_API);
    getMovies8(TVSearch_API);
    getMovies9(TVSearch_API);
    getMovies10(TVSearch_API);
    search.value = "";
  } else {
    window.location.reload();
  }
});
// Top rated Movies API ends here-------------------------------------------

// Popular Rated Movies API starts here-------------------------------------------
var Popular_API_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var popularMain = document.querySelector("#popular-movies");

// get movies
getMovies2(Popular_API_URL);

// async function for fetching API response
async function getMovies2(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies2(data.results);
}

// showMovies function to display data
function showMovies2(popmovies) {
  popularMain.innerHTML = "";

  popmovies.forEach((movie) => {
    var { title, poster_path, vote_average, overview } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
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

    popularMain.appendChild(movieEl);
  });
}
// // Popular Movies API ends here-------------------------------------------

// // Now Playing Movies API starts here-------------------------------------------
var Playing_API_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var nowplayingMain = document.querySelector("#nowplaying-movies");

// get movies
getMovies3(Playing_API_URL);

// async function for fetching API response
async function getMovies3(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies3(data.results);
}

// showMovies function to display data
function showMovies3(popmovies) {
  nowplayingMain.innerHTML = "";

  popmovies.forEach((movie) => {
    var { title, poster_path, vote_average, overview } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
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

    nowplayingMain.appendChild(movieEl);
  });
}
// Now Playing Movies API ends here-------------------------------------------

// Upcoming Movies API starts here-------------------------------------------
var Upcoming_API_URL =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var upcomingMain = document.querySelector("#upcoming-movies");

// get movies
getMovies4(Upcoming_API_URL);

// async function for fetching API response
async function getMovies4(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies4(data.results);
}

// showMovies function to display data
function showMovies4(popmovies) {
  upcomingMain.innerHTML = "";

  popmovies.forEach((movie) => {
    var { title, poster_path, vote_average, overview } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
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

    upcomingMain.appendChild(movieEl);
  });
}
// Upcoming Movies API ends here-------------------------------------------

// Trending Movies API starts here-------------------------------------------
var Trending_API_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var trendingMain = document.querySelector("#trending-movies");

// get movies
getMovies5(Trending_API_URL);

// async function for fetching API response
async function getMovies5(url) {
  var res = await fetch(url);
  var data = await res.json();
  console.log(data.results);
  showMovies5(data.results);
}

// showMovies function to display data
function showMovies5(popmovies) {
  trendingMain.innerHTML = "";

  popmovies.forEach((movie) => {
    var { title, poster_path, vote_average, overview } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
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

    trendingMain.appendChild(movieEl);
  });
}
// Trending Movies API ends here-------------------------------------------

// Top Rated TV shows API starts here-------------------------------------------
var TopRated_TV_API_URL =
  "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var topratedTvshows = document.querySelector("#toprated-tvshows");

// get movies
getMovies6(TopRated_TV_API_URL);

// async function for fetching API response
async function getMovies6(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies6(data.results);
}

// showMovies function to display data
function showMovies6(movies) {
  console.log("tvshows:", movies);
  topratedTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${IMG_PATH + poster_path}" alt="${name}"></figure>
          <div class="movie-info">
        <h3>${name}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
        <h3>Overview</h3>
        <p class="overview-info">${overview}<p>
      </div>
      </a>
      `;

    topratedTvshows.appendChild(movieEl);
  });
}
// Top rated TV shows API ends here-------------------------------------------

// Popular TV shows API starts here-------------------------------------------
var Popular_TV_API_URL =
  "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var popularTvshows = document.querySelector("#popular-tvshows");

// get movies
getMovies7(Popular_TV_API_URL);

// async function for fetching API response
async function getMovies7(url) {
  var res = await fetch(url);
  var data = await res.json();
  console.log("popular data:", data);
  showMovies7(data.results);
}

// showMovies function to display data
function showMovies7(movies) {
  console.log("tvshows:", movies);
  popularTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${IMG_PATH + poster_path}" alt="${name}"></figure>
          <div class="movie-info">
        <h3>${name}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
        <h3>Overview</h3>
        <p class="overview-info">${overview}<p>
      </div>
      </a>
      `;

    popularTvshows.appendChild(movieEl);
  });
}
// Popular TV shows API ends here-------------------------------------------

// Now Playing TV shows API starts here-------------------------------------------
var NowPlaying_TV_API_URL =
  "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var nowPlayingTvshows = document.querySelector("#nowplaying-tvshows");

// get movies
getMovies8(NowPlaying_TV_API_URL);

// async function for fetching API response
async function getMovies8(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies8(data.results);
}

// showMovies function to display data
function showMovies8(movies) {
  console.log("tvshows:", movies);
  nowPlayingTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${IMG_PATH + poster_path}" alt="${name}"></figure>
          <div class="movie-info">
        <h3>${name}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
        <h3>Overview</h3>
        <p class="overview-info">${overview}<p>
      </div>
      </a>
      `;

    nowPlayingTvshows.appendChild(movieEl);
  });
}
// Now Playing TV shows API ends here-------------------------------------------

// Upcoming TV shows API starts here-------------------------------------------
var Upcoming_TV_API_URL =
  "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var UpcomingTvshows = document.querySelector("#upcoming-tvshows");

// get movies
getMovies9(Upcoming_TV_API_URL);

// async function for fetching API response
async function getMovies9(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies9(data.results);
}

// showMovies function to display data
function showMovies9(movies) {
  console.log("tvshows:", movies);
  UpcomingTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${IMG_PATH + poster_path}" alt="${name}"></figure>
          <div class="movie-info">
        <h3>${name}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
        <h3>Overview</h3>
        <p class="overview-info">${overview}<p>
      </div>
      </a>
      `;

    UpcomingTvshows.appendChild(movieEl);
  });
}
// Upcoming TV shows API ends here-------------------------------------------

// Trending TV shows API starts here-------------------------------------------
var Trending_TV_API_URL =
  "https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=8d4b926cf05b61a6ecda293517bca22a";
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var TrendingTvshows = document.querySelector("#trending-tvshows");

// get movies
getMovies10(Trending_TV_API_URL);

// async function for fetching API response
async function getMovies10(url) {
  var res = await fetch(url);
  var data = await res.json();
  showMovies10(data.results);
}

// showMovies function to display data
function showMovies10(movies) {
  console.log("tvshows:", movies);
  TrendingTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${IMG_PATH + poster_path}" alt="${name}"></figure>
          <div class="movie-info">
        <h3>${name}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
        <h3>Overview</h3>
        <p class="overview-info">${overview}<p>
      </div>
      </a>
      `;

    TrendingTvshows.appendChild(movieEl);
  });
}
// Trending TV shows API ends here-------------------------------------------

// Slider function for API data starts
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let next_previous = document.querySelector(".next-previous");
let slider = document.querySelector(".slide-list");

let count = 0;
function slideImg(count) {
  if (count > -1360 && count < 0) {
    if (count < 0) {
      previous.style.visibility = "visible";
    }
    if (count > -1360) {
      next.style.visibility = "visible";
    }
  } else {
    if (count >= 0) {
      previous.style.visibility = "hidden";
    } else if (count <= -1360) {
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
// Slider function for API data ends

// to stopback browser back button starts
var body = document.querySelector("body");
body.addEventListener("load", function () {
  history.replaceState(null, null, document.URL);

  // Handle the popstate event to keep replacing the state
  window.onpopstate = function (event) {
    history.replaceState(null, null, document.URL);
  };
});
// to stopback browser back button ends

// Ontoggle hamburger function starts here
const menu = document.querySelector(".nav-menu");
const menuItems = document.querySelectorAll(".nav-link");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);
// Ontoggle hamburger function ends here