import 'regenerator-runtime';
// assets
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

// component
import './style/style.css';
import './script/component/upcoming-match.js';
import './script/component/finished-match.js';
import './script/component/detail-team.js';
import './script/component/standing-league.js';
import './script/component/table-detail.js';

//main function
import {main} from './script/app/main.js';

document.addEventListener('DOMContentLoaded', main);