import { loadPage } from './nav.js';
// api.js for get data from api

const toResponse = responseJson => responseJson.json();
const restApi = `https://api.football-data.org/v2/`
const options = {
    method: 'GET',
    headers: {
        'X-Auth-Token': '<API_KEY>'
    }
}
// function to get standing data
const getStanding = (league) => {
    const payload = `competitions/${league}/standings?standingType=TOTAL`;
    return fetch(`${restApi}${payload}`, options)
        .then(toResponse)
        .then(response => {
            return Promise.resolve(response);
        })
        .catch(err => {
            return Promise.reject(err);
        })
}
// function to get detali team data
const getDetail = (teamID) => {
    const payload = `teams/${teamID}`;
    return fetch(`${restApi}${payload}`, options)
        .then(toResponse)
        .then(response => {
            return Promise.resolve(response);
        })
        .catch(err => {
            return Promise.reject(err);
        })
}
// function to get match data
const getMatchData = (status, dateFrom, dateTo) => {
    const payload = `matches?dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}&competitions=CL,PL,SA,PD,FL1,BL1`;
    return fetch(`${restApi}${payload}`, options)
        .then(toResponse)
        .then(response => {
            return Promise.resolve(response);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

export { getMatchData, getStanding, getDetail };