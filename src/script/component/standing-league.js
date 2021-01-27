class StandingLeague extends HTMLElement {


    set dataStanding(standing) {
        this._dataStanding = standing;
        this.render();
    }
    render() {
        this.innerHTML = ``;
        this.innerHTML = `
			<style>
				table {
				    font-family: monospace;
				    text-align: center;
				}

				.point,
				.stat,
				.position {
				    text-align: center;
				}

				.point {
				    font-weight: bold;
				}

				.team-name a {
				    text-decoration: none;
				    color: black;
				    font-weight: bold;
				}

				.team-name a:hover {
				    text-decoration: underline;
				}
			</style>
			<h4>${this._dataStanding.competition.name} standing</h4>
			<h6>season : ${this._dataStanding.season.startDate.slice(0,4)}/${this._dataStanding.season.endDate.slice(0,4)}</h6>`
        this._dataStanding.standings.forEach(standing => {

            const tableElement = document.createElement('table');
            tableElement.innerHTML = `
					<thead>
					    <tr>
					        <th class="position">No</th>
					        <th class="team-name">Team-name</th>
					        <th class="stat">MD</th>
					        <th class="stat green-text text-darken-3">W</th>
					        <th class="stat grey-text text-darken-3">D</th>
					        <th class="stat red-text text-darken-3">L</th>
					        <th class="point">Poin</th>
					    </tr>
					</thead>
				`;
            const tbodyElement = document.createElement('tbody');
            standing.table.forEach(table => {
                const trElement = document.createElement('tr')
                trElement.innerHTML = `
						<td class="position">${table.position}</td>
						<td class="team-name"><a href="./?id=${table.team.id}#detail">${table.team.name}</a></td>
						<td class="stat">${table.playedGames}</td>
						<td class="stat green-text text-darken-3">${table.draw}</td>
						<td class="stat grey-text text-darken-3">${table.won}</td>
						<td class="stat red-text text-darken-3">${table.lost}</td>
						<td class="point">${table.points}</td>
					`;
                tbodyElement.appendChild(trElement);
            });
            tableElement.appendChild(tbodyElement);

            if (standing.group) {
                const titleTable = document.createElement('h5');
                titleTable.innerText = standing.group.toLowerCase();

                this.appendChild(titleTable);
                titleTable.after(tableElement);
            }else{
            	this.appendChild(tableElement);
            }
        })
    }
}

customElements.define('standing-league', StandingLeague);