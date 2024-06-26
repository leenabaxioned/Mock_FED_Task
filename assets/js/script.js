/* Author: */

// Login Function starts
document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("login-form");

  loginForm?.addEventListener("submit", function (event) {
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
  var logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Clear login state from local storage
    localStorage.removeItem("isLoggedIn");
    // Redirect to login page
    window.location.href = "login.html";
  });
})
  // Check if user is logged in, if not redirect to login page
 
// Logout function ends

$(document).ready(function () {
  const initializeSlick = (selector) => {
    $(selector).slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: true,
                infinite: true
            }
        },
        {
            breakpoint: 995,
            settings: {
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 776,
            settings: {
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 640,
            settings: {
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: false,
                arrows: true,
            }
        },
        {
            breakpoint: 375,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                arrows: true,
            }
        }
    ]
    });
  };

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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies1(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
}

// showMovies function to display data
function showMovies1(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    var { title, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
           <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${title}"></figure>
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
console.log(movieEl);
    main.appendChild(movieEl);
  });
  initializeSlick("#main");
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies2(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
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
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${title}"></figure>
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
  initializeSlick("#popular-movies");
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies3(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
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
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${title}"></figure>
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
  initializeSlick("#nowplaying-movies");
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies4(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
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
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${title}"></figure>
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
  initializeSlick("#upcoming-movies");
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies5(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
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
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${title}"></figure>
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
  initializeSlick("#trending-movies")
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies6(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
}

// showMovies function to display data
function showMovies6(movies) {
  topratedTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${name}"></figure>
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
  initializeSlick("#toprated-tvshows")
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies7(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
}

// showMovies function to display data
function showMovies7(movies) {
  popularTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${name}"></figure>
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
  initializeSlick("#popular-tvshows")
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies8(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
}

// showMovies function to display data
function showMovies8(movies) {
  nowPlayingTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${name}"></figure>
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
  initializeSlick("#nowplaying-tvshows")
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies9(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
}

// showMovies function to display data
function showMovies9(movies) {
  UpcomingTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${name}"></figure>
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
  initializeSlick("#upcoming-tvshows")
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
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error('Network response was not ok: ' + res.status);
    }
    var data = await res.json();
    showMovies10(data.results);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching data:', error);
  }
}

// showMovies function to display data
function showMovies10(movies) {
  TrendingTvshows.innerHTML = "";

  movies.forEach((movie) => {
    var { name, poster_path, vote_average, overview, backdrop_path } = movie;
    var movieEl = document.createElement("li");
    movieEl.setAttribute("id", movie.id);
    movieEl.classList.add("movie");
    movieEl.classList.add("slide-item");

    movieEl.innerHTML = `
  <a href="./details.html?id=${movie.id}" title="Movie Details">
          <figure><img src="${poster_path ? IMG_PATH + poster_path :'https://placehold.co/167x250/EEE/31343C'}" alt="${name}"></figure>
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
  initializeSlick("#trending-tvshows")
}

// Trending TV shows API ends here-------------------------------------------

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// Details Movies API starts here-------------------------------------------
var Details_API_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=8d4b926cf05b61a6ecda293517bca22a`;
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var detailsMain = document.querySelector(".detailsContainer");

// get movies
getMovies11(Details_API_URL);

// async function for fetching API response
async function getMovies11(url) {
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok: " + res.status);
    }
    var data = await res.json();
    showMovies11(data);
  } catch (error) {
    // Handle errors here
    console.error("Error fetching data:", error);
  }
}

// showMovies function to display data
function showMovies11(popmovies) {
  //  detailsMain.innerHTML = "";

  var { title, backdrop_path, vote_average, overview } = popmovies;
  var movieEl = document.createElement("div");
  movieEl.classList.add("detail-info");

  movieEl.innerHTML = `
           <figure><img src="${
             IMG_PATH + backdrop_path
           }" alt="${title}=${id}"></figure>
           <div class="detail-content">
           <div class="movie-info">
         <h3>${title}</h3>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
           </div>
           <div class="overview">
         <h3>Overview</h3>
         <p class="overview-info">${overview}<p>
       </div>
       </div>
       `;

  detailsMain.appendChild(movieEl);
}
// Details Movies API ends here-------------------------------------------

// Details TV shows API starts here---------------------------------------
var Details_TV_API_URL = `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=8d4b926cf05b61a6ecda293517bca22a`;
var IMG_PATH = "https://image.tmdb.org/t/p/w1280";

var detailsMain = document.querySelector("#tvContainer");

// get movies
getMovies12(Details_TV_API_URL);

// async function for fetching API response
async function getMovies12(url) {
  try {
    var res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok: " + res.status);
    }
    var data = await res.json();
    showMovies12(data);
  } catch (error) {
    // Handle errors here
    console.error("Error fetching data:", error);
  }
}

// showMovies function to display data
function showMovies12(popmovies) {
  //  detailsMain.innerHTML = "";

  var { original_name, backdrop_path, vote_average, overview } = popmovies;
  var movieEl = document.createElement("div");
  movieEl.classList.add("detail-info");

  movieEl.innerHTML = `
           <figure><img src="${
             IMG_PATH + backdrop_path
           }" alt="${original_name}"></figure>
           <div class="detail-content">
           <div class="movie-info">
         <h3>${original_name}</h3>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
           </div>
           <div class="overview">
         <h3>Overview</h3>
         <p class="overview-info">${overview}<p>
       </div>
       </div>
       `;

  detailsMain.appendChild(movieEl);
}
});
// Details TV shows API ends here---------------------------------------

// to stopback browser back button starts--------------------------------------
var body = document.querySelector("body");
body.addEventListener("load", function () {
  history.replaceState(null, null, document.URL);

  // Handle the popstate event to keep replacing the state
  window.onpopstate = function (event) {
    history.replaceState(null, null, document.URL);
  };
});
// to stopback browser back button ends-----------------------------------------

// Ontoggle hamburger function starts here------------------------------------
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
// Ontoggle hamburger function ends here-----------------------------------