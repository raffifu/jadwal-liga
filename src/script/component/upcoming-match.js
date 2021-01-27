class UpcomingMatch extends HTMLElement {

    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    set dataMatch(match){
    	[this._imgPath, this._dataMatch] = match;
    	this._dateMatch = new Date(this._dataMatch.utcDate).toLocaleString().split(' ');
    	this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
			<style>
				:host {
					margin: 10px;
				}
				.label-match {
				    display: inline-block;
				    background: white;
				    border-radius: 20px;
				    padding: 3px 7px;
				    margin-bottom: 5px;
				}

				.label-match p {
				    font-size: 0.9em;
				    font-family: monospace;
				}

				.card-match {
				    padding: 10px 20px;
				    background: #FFEAAA;
				    border-radius: 7px;
				    width: 270px;
				    box-sizing: border-box;
				    display: flex;
				    flex-direction: column;
				    align-items: center;
				    box-shadow: 3px 3px 5px #888;
				    float:left;
				}

				.body-match {
				    text-align: center;
				    display: flex;
				    align-items: center;
				    width: 100%
				}
				
				a{
					text-decoration: none;
					color: black;
				}

				a:hover {
					text-decoration: underline;
				}
				
				.body-match a {
				    flex-basis: 30%;
				    text-decoration: none;
				}

				.team {
				    border-radius: 10px;
				    height: 90px;
				    display: flex;
				    flex-direction: column;
				    align-items: center;
				    overflow: hidden;
				    color: black;
				    padding-top: 5px;
				}

				.team img {
				    // max-width: 75%;
				    max-height: 55px;
				}

				.team .name-team {
				    margin-top: 5px;
				    align-items: center;
				    // display:flex;
				    flex-grow: 1;
				    font-size: 0.8em;
				    width: 100%;
				}

				.match-info {
				    flex-basis: 40%;
				    font-family: sans-serif;
				    margin-top: -20px;
				}

				.match-info h6 {
				    font-weight: normal;
				    font-size: 0.8em;
				}

				.match-info h1 {
				    font-style: italic;
				    font-size: 2.5em;
				}

				h1,
				h6,
				p {
				    margin: 0 auto;
				    font-family: monospace;
				}

				a .team:hover .name-team p {
				    text-decoration: underline;
				}
			</style>
			<div class="card-match">
		        <div class="label-match">
		            <a href="./?league=${this._dataMatch.competition.id}#standing"><p>${this._dataMatch.competition.name}</p></a>
		        </div>
		        <div class="body-match">
		            <a href="./?id=${this._dataMatch.homeTeam.id}#detail">
		                <span class="team">
		                <img src="${this._imgPath['home']}" alt="${this._dataMatch.homeTeam.name}">
		                <div class='name-team'>
		                    <p>${this._dataMatch.homeTeam.name}</p>
		                </div>
		            </span>
		            </a>
		            <span class="match-info">
		                <h1>VS</h1>
		                <h6>${this._dateMatch[1].slice(0,-3)}</h6>
		                <h6>${this._dateMatch[0].slice(0,-1)}</h6>
		            </span>
		            <a href="./?id=${this._dataMatch.awayTeam.id}#detail">
		                <span class="team">
		                <img src="${this._imgPath['away']}" alt="${this._dataMatch.awayTeam.name}">
		                <div class='name-team'>
		                    <p>${this._dataMatch.awayTeam.name}</p>
		                </div>
		            </span>
		            </a>
		            
		        </div>
		    </div>
		`
    }
}
customElements.define('upcoming-match', UpcomingMatch);