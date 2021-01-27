// nav.js for control navigation
import { loadHome, loadStanding, loadDetailTeam, loadFavorite } from './main.js';

// list navItem
const nav = [{
        'icon': 'home',
        'name': 'Home'
    },
    {
        'icon': 'public',
        'name': 'Standing'
    },
    {
        'icon': 'favorite_border',
        'name': 'Favorite'
    },
]; 

function loadNav(nav) {
    document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
        nav.forEach(function(navItem) {
            const liElement = document.createElement('li');
            liElement.innerHTML = `<a class="sidenav-close black-text" href="./#${navItem.name}"><i class="tiny material-icons left">${navItem.icon}</i> ${navItem.name}</a>`;
            elm.appendChild(liElement);
        })
    })

    document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm) {
        elm.addEventListener('click', function(event) {
            splashStart();
            const page = event.target.getAttribute('href').substr(3).toLowerCase();
            if (page === "" || page === 'home') loadHome();
            else if (page === 'detail') loadDetailTeam();
            else if (page === 'favorite') loadFavorite();
            else if (page === 'standing') loadStanding();
        })
    })
}

const loadPage = page => {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(responseText => {
            splashStop();
            document.getElementById('content').innerHTML = responseText;
        })
}

const splashStart = () => {
    document.querySelector("#loading").style.display = 'flex';
}

const splashStop = () => {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 300)
}



export { loadPage, loadNav, nav, splashStart, splashStop };