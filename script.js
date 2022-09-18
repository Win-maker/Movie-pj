//landing page dom
const confg = document.querySelector('#confg');
const imgbox = document.querySelector('.imgbox-toggle');
const landingimg = document.querySelector('#landing-img');
const imgs = Array.from(document.querySelectorAll('.img'));

//load
const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
    loader.style.display = 'none';
})


//header dom
const header = document.querySelector('.header');
//arrow Up Dom
const arrowUp = document.querySelector('.scrollUp');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        header.style.backgroundColor = ' #7f8e9e';
        arrowUp.style.bottom = '20px';
    }
    else {
        header.style.backgroundColor = '#4d648d';
    }
})

//scroll up 
arrowUp.addEventListener('click', () => {
    window.scroll({
        top: 100,
        left: 100,
        behavior:'smooth'

    });
})

// image box toggle
confg.addEventListener('click', () => {
    imgbox.classList.toggle('togglebox');
})

imgs.map(img => {

    img.addEventListener('click', () => {

        imgs.forEach(element => {
            element.style.opacity = 1;
        });

        landingimg.src = img.src;
        img.style.opacity = 0.5;
    })
});


// Fetch Movie
const movieContainer = document.querySelector('.movie-container');
const imgUrl = 'https://image.tmdb.org/t/p/w500/';


const url = {
    apiKey: 'api_key=959d4da9a1ef4f6f02a57175bd498295',
    baseUrl:'https://api.themoviedb.org/3/discover/movie?'
}

const popularUrl = url.baseUrl +'sort_by=popularity.desc&'+ url.apiKey;
const searchUrl = 'https://api.themoviedb.org/3/search/movie?'+url.apiKey;

function fetchUrl(path) {
    fetch(path)
        .then(res => res.json())
    .then(data => showMovie(data))
};

fetchUrl(popularUrl);

function showMovie(data) {
    let result = data.results;
    movieContainer.innerHTML = '';
    result.forEach(movie => {
        const divTag = document.createElement('div');
        divTag.className = 'card';
        divTag.innerHTML = ` <div class="img-box">
        <img src="${imgUrl+movie.poster_path}" alt="movie" srcset="">
    </div>
    <div class="detail">
        <h3>${movie.original_title}</h3>
        <span>${movie.vote_average}</span>
    </div>

    <div class="overview">
        <h3>Overview</h3>
        <p>${movie.overview}</p>
        <p>Released At <strong>${movie.release_date}</strong></p>
    </div>`;
        movieContainer.appendChild(divTag);
    })
}

// Search Movie

document.querySelector('.search-box').addEventListener('keypress', (e) => {
  
 
    let val = e.target.value;
        if (val) {
            fetchUrl(searchUrl+"&query="+val);
        }
        else {
            fetchUrl(popularUrl);
        }

})

