class TableDetail extends HTMLElement{
	set dataTeam(detail){
		this._dataTeam = detail;
		this.render()
	}
	render(){
		this.innerHTML = `
			<style>
			table-detail{
				flex: 1 65%;
			}
				table {
				    font-family: monospace;
				    table-layout: fixed;
				    width: 100%;
				    border-spacing: 2px;
				    border-collapse: unset;
				}

				thead {
				    display: none;
				}

				tr {
				    border-bottom: 0px;
				    margin-bottom: 3px;
				}

				td,
				th {
				    margin: 0;
				    padding: 0 10px;
				}

				.table-team {
				    padding: 0 10px;
				}

				.Goalkeeper,
				.Defender,
				.Midfielder,
				.Attacker,
				.coach {
				    font-weight: bold;
				    text-align: center;
				    padding: 3px 10px;
				    border-radius: 7px;
				}

				.Goalkeeper {
				    background-color: gold;
				}

				.Goalkeeper::before {
					content: "GK";
				}

				.Defender {
				    background-color: darkturquoise;
				}

				.Defender::before {
					content: "CB";
				}

				.Midfielder {
				    background-color: lightgreen;
				}

				.Midfielder::before {
					content: "MF";
				}

				.Attacker {
				    background-color: tomato;
				}

				.Attacker::before {
					content: "CF";
				}

				.player {
				    width: 10%;
				}

				.name-player {
				    width: 75%;
				}

				.number-player {
				    width: 15%;
				}
				
				.coach {
					background-color: black;
					color: white;
					text-align: center;
				}

				.coach::before {
					content : "Co"
				}

				@media screen and (max-width: 800px) {
				    

				    .position-player {
				        width: 15%;
				    }

				    .name-player {
				        width: 70%;
				    }

				    .number-player {
				        width: 15%;
				    }
				}
			</style>
			<div class="table-team" id="table-team">
				<h6>Players & Coach</h6>
			</div>
		`;
		const tableElement = document.createElement('table');
		tableElement.innerHTML = `
			<thead>
			    <tr>
			        <th class='name-player'>Player name</th>
			        <th class="position-player">PS</th>
			    </tr>
			</thead>
		`

		const tbodyElement = document.createElement('tbody');
		this._dataTeam.forEach(player => {
			const trElement = document.createElement('tr');
			trElement.innerHTML = `
				<td class='name-player'>${player.name}</td>
				<td class="${player.position} ${player.role.toLowerCase()}"></td>
			`;
			tbodyElement.appendChild(trElement);
			tbodyElement.appendChild(document.createElement('hr'))
		})
		tableElement.appendChild(tbodyElement);

		this.querySelector('#table-team').appendChild(tableElement);
	}
}

customElements.define('table-detail', TableDetail);