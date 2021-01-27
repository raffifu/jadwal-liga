import { loadPage, loadNav, nav, splashStart, splashStop } from './nav.js';
import { getMatchData, getStanding, getDetail } from './api.js';
import { saveToDB, getById, getFromDB, deleteFromDB } from './db.js';

const dateNow = getDate(new Date(), 'now');
const dateTo = getDate(new Date(), 'future');
const datePast = getDate(new Date(), 'past');

const keys = 'localStorage-keys';
let imageUrl = {};

const appKey = urlB64ToUint8Array("BHW5ZqRyDvt7UfK_3jciW3SL7qyQsx_icYubnqpvhwNMDqYDDF0v5nBP2HorWMXVs2WdMpExBgmZCWlh1pwqPMY");

function getDate(date, par) {
    //function to get date now, past, and future for filter in api
    if (par === 'future') {
        date.setDate(date.getDate() + 10);
        return date.toISOString().slice(0, 10);
    } else if (par === 'past') {
        date.setDate(date.getDate() - 10);
        return date.toISOString().slice(0, 10);
    } else if (par === 'now') return date.toISOString().slice(0, 10);
}

function getPathImage(url) {
    // jika url kosong (tidak ada) diganti emblem blank
    if (url) return url
    return 'img/emblem-blank.svg';
}

function objCreateElement(elementName, obj) {
    const elmParent = document.getElementById(elementName);
    for (const [item, value] of Object.entries(obj)) {
        const elm = document.createElement(elementName);
        const imgData = {
            home: getPathImage(imageUrl[value.homeTeam.id]),
            away: getPathImage(imageUrl[value.awayTeam.id])
        }
        elm.dataMatch = [imgData, value];
        elmParent.appendChild(elm);
    }
}

function navigationInit() {
    // print all navigation item to navbar
    loadNav(nav);
    // trigger splash screen
    splashStart();
    const page = isPage();
    if (page === "" || page === 'home') loadHome();
    else if (page === 'detail') loadDetailTeam();
    else if (page === 'favorite') loadFavorite();
    else if (page === 'standing') loadStanding();
}

function isPage(){
    return window.location.hash.substr(1).toLowerCase();
}

async function onClickEvent() {
    // click event in detail-team (love trigger)
    const idTeam = parseInt(this.getAttribute('data-id'))
    const isSaved = await getById(idTeam)
        .then(response => {
            if (response === undefined) return false;
            return true;
        });

    const toastHtml = '<i class=\'material-icons left\'>check_circle</i>';

    if (isSaved) {
        deleteFromDB(idTeam);
        M.toast({html: toastHtml+'Removed from Favorite!',displayLength: 1500, classes: 'rounded'});
    } else {
        const item = document.querySelector('detail-team').value;
        saveToDB(item);
        M.toast({html: toastHtml+'Added to Favorite!',displayLength: 1500, classes: 'rounded'});
    }
    if(isPage() === 'favorite') loadFavorite();
}

function renderDetailTeam(response, state) {
    document.getElementById('content').innerHTML = `
            <h4>Detail Team</h4>
            <section id="layout-detail-team"></section>
        `

    const layoutNest = document.getElementById('layout-detail-team');

    const detailTeam = document.createElement('detail-team');
    detailTeam.dataTeam = [response, onClickEvent, state];

    const tableDetail = document.createElement('table-detail');
    tableDetail.dataTeam = response.squad;

    layoutNest.appendChild(detailTeam);
    detailTeam.after(tableDetail);
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const getImageUrl = () => {
    // function to get detail image url from all league
    const leagues = ['CL', 'PL', 'SA', 'PD', 'FL1', 'BL1'];

    Promise.all(leagues.map(league => getStanding(league)))
        .then(response => {
            response.forEach(data => {
                data['standings'].forEach(standing => {
                    standing.table.forEach(teamDetail => {
                        const url = teamDetail.team.crestUrl;
                        imageUrl[teamDetail.team.id] = url.replace(/^http:\/\//i, 'https://');
                    })
                })
            });
            localStorage.setItem(keys, JSON.stringify(imageUrl));
        });
}

const loadHome = () => {
    // load home get 2 data finished and upcoming match (scheduled)
    Promise.all([getMatchData('FINISHED', datePast, dateNow), getMatchData('SCHEDULED', dateNow, dateTo)])
        .then(response => {

            document.getElementById('content').innerHTML = `
                <h4>Upcoming Match</h4>
                <section id="upcoming-match"></section>
                <h4>Finished Match</h4>
                <seciton id="finished-match"></seciton>
        `;
            splashStop();
            const [finishedMatch, upcomingMatch] = response;

            objCreateElement('upcoming-match', upcomingMatch.matches);
            objCreateElement('finished-match', finishedMatch.matches.reverse());
        }).catch(err => {
            loadPage('failed-fetch');
        })

}

const loadStanding = () => {

    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("league");

    if (!idParam) idParam = 'PL';

    getStanding(idParam)
        .then(response => {
            splashStop();
            const content = document.getElementById('content');
            content.innerHTML = ``;

            const elm = document.createElement('standing-league');
            elm.dataStanding = response;

            content.appendChild(elm);
        }).catch(err => {
            loadPage('failed-fetch');
        })
}

const loadDetailTeam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if (!idParam) {
        loadHome();
        return;
    }
    // cek apakah ada di indexedDB
    getById(parseInt(idParam))
        .then(response => {
            splashStop();
            if (response) {
                //true artinya team ada di indexedDB
                renderDetailTeam(response, true);
            } else {
                getDetail(idParam)
                    .then(response => {
                        renderDetailTeam(response, false);
                    }).catch(err => {
                        loadPage('failed-fetch');
                    })
            }
        })
}

const loadFavorite = () => {

    getFromDB()
        .then(response => {
            splashStop();
            if (response.length === 0) throw '404';
            const nest = document.getElementById('content');
            nest.innerHTML = `
            <h4>Favorite Team</h4>
            <section id="favorite-team"></section>
            `;

            const parent = document.getElementById('favorite-team');
            response.forEach(item => {
                const favoriteTeam = document.createElement('detail-team');
                favoriteTeam.dataTeam = [item, onClickEvent, true];

                parent.appendChild(favoriteTeam);

            })

        }).catch(err => {
            if (err === '404') loadPage('404');
        })
}

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(swReg => console.log('Registered!'))
    }
}

const subscribeUser = () => {
    navigator.serviceWorker.ready.then(() => {
        if ('PushManager' in window) {
            navigator.serviceWorker.getRegistration()
                .then(reg => {
                    reg.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: appKey
                        })
                        .then(subscribtion => {
                            console.log('Berhasil Subscribe dengan endpoint:', subscribtion.endpoint);
                            console.log('p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribtion.getKey('p256dh')))));
                            console.log('auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribtion.getKey('auth')))));
                        })
                })
                .catch(err => {
                    console.log('tidak dapat melakukan subscribe', err);
                })
        }
    })
}

const requestPerm = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === 'granted') {
                subscribeUser();
            }
        })
    } else {
        console.log('Browser tidak mendukun notif')
    }
}

const main = () => {
    // register sw dan request permission notif
    registerServiceWorker();
    requestPerm();

    // check data di localStorage
    // localStorage untuk menyimpan url gambar tim
    // (karena fetch data match tidak ada url gambar)
    if (!localStorage.getItem(keys)) {
        getImageUrl();
    } else {
        imageUrl = JSON.parse(localStorage.getItem(keys))
    }

    //init Materialize sidenav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    //init all Navigation
    navigationInit();
}

export { main, loadHome, loadStanding, loadDetailTeam, loadFavorite };