class FinishedMatch extends HTMLElement {
	constructor(){
		super();
		this.shadowDom = this.attachShadow({mode: 'open'});
	}

	set dataMatch(match){
		[this._imgPath, this._dataMatch] = match;
		this._date = new Date(this._dataMatch.utcDate).toLocaleString().split('/');
		this.render();
	}

	render() {
		this.shadowDom.innerHTML = `
			<style>
				:host {
					margin: 10px;
					flex: 1 35%;
				}
				.card-match {
				    padding: 10px 0;
				    box-sizing: border-box;
				    background: #f2f2f2;
				    border-radius: 7px;
				    box-shadow: 3px 3px 5px #888;
				    display: flex;
				    flex-direction: column;
				    align-items: center;
				}

				.body-match {
				    display: flex;
				    width: 90%;
				}

				.label-match {
				    display: inline-block;
				    background: white;
				    border-radius: 20px;
				    padding: 3px 7px;
				    margin-bottom: 5px;
				}

				.left-item {
				    display: inherit;
				    flex-wrap: wrap;
				    align-items: center;
				    flex: 1 75%;
				}

				.right-item {
				    flex: 1 25%;
				    display: inherit;
				    flex-direction: column;
				    align-items: center;
				    justify-content: center;
				}

				a {
				    display: inherit;
				    align-items: center;
				    text-decoration: none;
				    color: black;
				    flex: 1 90%;
				}

				.team {
				    flex: 1 25%;
				    display: inherit;
				    flex-direction: column;
				    align-items: center;
				    height: 30px;
				}

				.team .image {
				    width: 30px;
				    height: 30px;
				    display: inherit;
				}

				img {
				    max-width: 80%;
				    max-height: 25px;
				    margin: auto;
				}

				.name-team {
				    flex: 1 65%;
				}

				.score-team {
				    flex: 1 10%;
				    text-align: center;
				}

				p {
				    margin: 0;
				    font-family: monospace;
				    font-size: 0.9em;
				}

				a:hover {
					text-decoration: underline;
				}
				@media screen and (max-width: 800px) {
				    :host {
				        flex: 1 100%;
				    }
				}
			</style>

			<div class="card-match">
			        <div class="label-match">
			            <a href="./?league=${this._dataMatch.competition.id}#standing"><p>${this._dataMatch.competition.name}</p></a>
			        </div>
			        <div class="body-match">
			            <div class="left-item">
			                <a href="./?id=${this._dataMatch.homeTeam.id}#detail">
			                    <div class="team">
			                        <div class="image">
			                            <img src="${this._imgPath['home']}" alt='${this._dataMatch.homeTeam.name}'>
			                        </div>
			                    </div>
			                    <div class="name-team">
			                        <p>${this._dataMatch.homeTeam.name}</p>
			                    </div>
			                </a>
			                <div class="score-team">
			                    <p>${this._dataMatch.score.fullTime.homeTeam}</p>
			                </div>
			                <a href="./?id=${this._dataMatch.awayTeam.id}#detail">
			                    <div class="team">
			                        <div class="image">
			                            <img src="${this._imgPath['away']}" alt='${this._dataMatch.awayTeam.name}'>
			                        </div>
			                    </div>
			                    <div class="name-team">
			                        <p>${this._dataMatch.awayTeam.name}</p>
			                    </div>
			                </a>
			                <div class="score-team">
			                    <p>${this._dataMatch.score.fullTime.awayTeam}</p>
			                </div>
			            </div>
			            <div class="right-item">
			                <p>${this._date[0]}/${this._date[1]}</p>
			            </div>
			        </div>
			    </div>
		`
	}
}

customElements.define('finished-match', FinishedMatch);