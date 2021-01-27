class DetailTeam extends HTMLElement {

    set dataTeam(data) {
        [this._dataTeam, this._onClick, this._state] = data;
        this._competition = ``;

        this._url = this._dataTeam.crestUrl;

        // to display all Competition with anchor
        this._dataTeam.activeCompetitions.forEach(competition => {
        	if(competition.plan === 'TIER_ONE')
            	this._competition += `<a href='?league=${competition.id}#standing'>[${competition.name}]</a> `;
            else
            	this._competition += `[${competition.name}] `;
        });

        this.render();
    }

    get value() {
        return this._dataTeam;
    }

    render() {
        this.innerHTML = `
			<style>
				detail-team {
					flex: 1 35%;
					margin: 10px;
				}

				.detail-card {
					position: relative;
					width: 100%;
					background-color: #FFEAAA;
					border-radius: 7px;
					box-shadow: 3px 3px 5px #888;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					padding: 15px 0;
				}

				.saved {
					background-color: #fff !important;
					color: #EB5757 !important;
				}

				#save-button {
					position: absolute;
					top:0;
					right: 0;
					margin: 5px;
					cursor: grabbing;
					background: #aaa;
					border-radius: 100%;
					box-shadow: 1px 1px 3px #888;
					width: 20px;
					height: 20px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 1.8em;
					padding: 0 3px;
					color: white;
				}

				.img-club {
					width: 100px;
					height: 100px;
					flex: 1 35%;
				}

				.img-club img {
					max-width: 100%;
					max-height: 100%;
					display: block;
					margin: auto;
				}

				.detail-club {
					display: inherit;
					flex-wrap: wrap;
					align-items: center;
					flex: 1 65%;
					height: 80%;
				}

				.title {
					flex: 1 100%;
					font-weight: bold;
					font-size: 1.1em;
				}
				.icon {
					flex: 1 20%;
					text-align: center;
					font-size: 1.8em;
				}
				.part-detail{
					flex: 1 80%;
				}

				a {
					color: black;
				}

				a:hover {
					text-decoration: underline
				}

				p {
					margin: 0;
				}

				@media screen and (max-width: 800px){
					.detail-card{
						width: 75%;
						margin: auto;
					}
				}
				@media screen and (max-width: 540px){
					.detail-card{
						width: 80%;
					}
				}
				@media screen and (max-width: 460px){
					.detail-card {
						width: 100%;
					}
				}

			</style>
			<div class="detail-card">
				<div id="save-button" data-id='${this._dataTeam.id}' ><i class="material-icons tiny">favorite</i></div>
			    <div class="img-club">
			        <img src="${this._url.replace(/^http:\/\//i, 'https://')}" alt="${this._dataTeam.name}">
			    </div>
			    <div class="detail-club">
			        <div class="title">
			            <a href="./?id=${this._dataTeam.id}#detail"><p>${this._dataTeam.name}</p></a>
			        </div>
			        <div class="icon">
			            <i class="material-icons">public</i>
			        </div>
			        <div class="part-detail">
			            <p>${this._competition}</p>
			        </div>
			        <div class="icon">
			            <i class="material-icons">calendar_today</i>
			        </div>
			        <div class="part-detail">
			            <p>${this._dataTeam.founded}</p>
			        </div>
			        <div class="icon">
			            <i class="material-icons">location_city</i>
			        </div>
			        <div class="part-detail">
			            <p>${this._dataTeam.venue}</p>
			        </div>
			    </div>
			</div>
		`;

        if (this._state) this.querySelector('#save-button').classList.add('saved');
        this.querySelector('#save-button').addEventListener('click', this._onClick);
    }
}
customElements.define('detail-team', DetailTeam);