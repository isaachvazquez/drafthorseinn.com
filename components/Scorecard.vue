<template>
	<div class="Scorecard">

		<p>👋 Add Rules + Course Info Here (Yardage Markers, Flag Placements, Course Layout, etc)</p>

		<ul>
			<li>Click/Tap the hole number to view info/stats about the hole</li>
		</ul>

		<div class="FlexyTable mb-2 mt-2" style="padding-top: 0;">
			<div>
				<table cellpadding="1" cellspacing="1">
					<thead class="Scorecard-tableHeadings">
						<tr>
							<th colspan="2" rowspan="3">Name & Tee Box</th>
							<th colspan="9">Out</th>
							<th rowspan="3">Out</th>
							<th colspan="9">In</th>
							<th rowspan="3">In</th>
							<th rowspan="3">Total</th>
						</tr>
						<tr>
							<th v-for="(par, index) in parValuesFront9" :key="`hole-${index + 1}-par-${par}`">
								Hole {{index + 1}}
							</th>
							<th v-for="(par, index) in parValuesBack9" :key="`hole-${index + 1}-par-${par}`">
								Hole {{index + 10}}
							</th>
						</tr>
						<tr>
							<th v-for="(par, index) in parValuesFront9" :key="`hole-${index + 1}-par-${par}`">
								Par {{par}}
							</th>
							<th v-for="(par, index) in parValuesBack9" :key="`hole-${index + 1}-par-${par}`">
								Par {{par}}
							</th>
						</tr>
						<tr>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(player, index) in players" :key="`player-${index + 1}`">
							<td class="flex flex--nowrap align-center">
								<button class="UnstyledIconButton mr-2" @click.stop.prevent="removePlayer(index)">
									<svg class="trash-icon"><use href="#trash-icon"></use></svg>
								</button>
								<input :id="`player-${index + 1}-${player.name}`" type="text" placeholder="Player Name" v-model="players[index]['name']" @input="saveDataToLocalStorage()">
							</td>
							<td>
								<select id="tee${playerIndex}" v-model="players[index]['teeBox']" @change="saveDataToLocalStorage()">
									<option value="">No Tee Box</option>
									<option :value="teeBox" v-for="teeBox in teeBoxes" :key="`player-${index + 1}-teeBox-${teeBox}`">{{teeBox}}</option>
								</select>
							</td>
							<td v-for="n in 9" :key="`player-${index + 1}-hole-${n}-score`">
								<input :id="`${player.name}-${index}-hole-${n}-score`" type="number" min="1" max="16" inputmode="numeric" v-model="players[index]['frontNineScores'][n - 1]" @input="saveDataToLocalStorage()" />
								<span class="score-indicator" v-if="players[index]['frontNineScores'][n - 1] == 1">
									1️⃣
								</span>
								<span class="score-indicator" v-else-if="players[index]['frontNineScores'][n - 1] - parValuesFront9[n - 1] == -2">
									🦅
								</span>
								<span class="score-indicator" v-else-if="players[index]['frontNineScores'][n - 1] - parValuesFront9[n - 1] == -1">
									🟢
								</span>
								<span class="score-indicator" v-else-if="players[index]['frontNineScores'][n - 1] == parValuesFront9[n - 1]">
									⛳️
								</span>
								<span class="score-indicator" v-else-if="players[index]['frontNineScores'][n - 1] - parValuesFront9[n - 1] == 1">
									🅱️
								</span>
								<!-- <span class="score-indicator" v-else-if="players[index]['frontNineScores'][n - 1] - parValuesFront9[n - 1] == 2">
									🅱️🅱️
								</span> -->
								<span class="score-indicator" v-else-if="players[index]['frontNineScores'][n - 1] - parValuesFront9[n - 1] > 1">
									+{{ players[index]['frontNineScores'][n - 1] - parValuesFront9[n - 1]}}
								</span>

							</td>
							<td class="score">
								<span v-if="players[index]['frontNineScores'].length == 0">
									-
								</span>
								<span v-else>
									{{players[index]['frontNineScores'].reduce((sum, score) => sum + score, 0)}} {{players[index]['frontNineScores'].length == 9 ? '' : `Through ${players[index]['frontNineScores'].length}`}}
								</span>
							</td>
							<td v-for="n in 9" :key="`player-${index + 1}-hole-${n}-score`">
								<input :id="`${player.name}-${index}-hole-${n + 9}-score`" type="number" min="1" max="16" inputmode="numeric" v-model="players[index]['backNineScores'][n - 1]" @input="saveDataToLocalStorage()" />
							</td>
							<td class="score">
								<span v-if="players[index]['backNineScores'].length == 0">
									-
								</span>
								<span v-else>
									{{players[index]['backNineScores'].reduce((sum, score) => sum + score, 0)}}
									
									
									<span v-if="players[index]['backNineScores'].length < 9">
										Through {{ players[index]['backNineScores'].length + 9 }}
									</span>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div><!-- END inner div -->
		</div><!-- END scrollable -->

		<button class="Button mr-1" @click.stop="addPlayer()" v-if="players.length < 8">Add Player</button>
		<button class="Button Button--secondary" @click.stop="clearScorecard()">Clear Scorecard</button>


		<div class="qr-code mt-5">
			<span>Scan Me to open Scorecard</span>
			<img src="/scorecard-qr-code.png" alt="" class="qr-code">
		</div>


		<!-- {{players}} -->

	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';


	// TODO: GET THESE VALUES FROM SANITY
	const parValuesFront9 = ref([5, 5, 3, 4, 4, 3, 4, 4, 5]);
	const parValuesBack9 = ref([4, 4, 3, 4, 4, 4, 5, 3, 4]);
	const yardageMarkers = [];
	const teeBoxes = ['Black', 'Blue', 'White', 'Gold', 'Red'];
	// const teeBoxes = [
	// 	{
	// 		id: 'black',
	// 		label: 'Black',
	// 		yardagesByHole: [],
	// 		color: '',
	// 		rating: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		slope: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0,
	// 		},
	// 		handicap: {
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		frontNineTotalYards: 0,
	// 		backNineTotalYards: 0,
	// 		overalTotalYards: 0
	// 	},
	// 	{
	// 		id: 'blue',
	// 		label: 'Blue',
	// 		yardagesByHole: [],
	// 		color: '',
	// 		rating: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		slope: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0,
	// 		},
	// 		handicap: {
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		frontNineTotalYards: 0,
	// 		backNineTotalYards: 0,
	// 		overalTotalYards: 0
	// 	},
	// 	{
	// 		id: 'white',
	// 		label: 'White',
	// 		yardagesByHole: [],
	// 		color: '',
	// 		rating: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		slope: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0,
	// 		},
	// 		handicap: {
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		frontNineTotalYards: 0,
	// 		backNineTotalYards: 0,
	// 		overalTotalYards: 0
	// 	},
	// 	{
	// 		id: 'gold',
	// 		label: 'Gold',
	// 		yardagesByHole: [],
	// 		color: '',
	// 		rating: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		slope: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0,
	// 		},
	// 		handicap: {
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		frontNineTotalYards: 0,
	// 		backNineTotalYards: 0,
	// 		overalTotalYards: 0
	// 	},
	// 	{
	// 		id: 'red',
	// 		label: 'Red (Fronts)',
	// 		yardagesByHole: [],
	// 		color: '',
	// 		rating: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		slope: {
	// 			all: 0,
	// 			mens: 0,
	// 			womens: 0,
	// 		},
	// 		handicap: {
	// 			mens: 0,
	// 			womens: 0
	// 		},
	// 		frontNineTotalYards: 0,
	// 		backNineTotalYards: 0,
	// 		overalTotalYards: 0
	// 	},
	// ];

	const players = ref([]);

	const playerModel = {
		name: '',
		teeBox: '',
		frontNineScores: [],
		backNineScores: [],
		inTotal: 0,
		outTotal: 0,
		overallTotal: 0,
		frontNineNotes: [],
		backNineNotes: [],
	};



	const loadDataFromLocalStorage = () => {
		const saved = JSON.parse(localStorage.getItem('golfScorecard') || '[]');
		console.log({saved});
		saved.forEach(player => {
			addPlayer(player);
		});

		if(saved.length === 0) addPlayer();
	}


	const addPlayer = (optionalPlayer) => {
		const playerModelClone = optionalPlayer ? optionalPlayer : { ...playerModel };
		players.value.push(playerModelClone);
		saveDataToLocalStorage();
	}
	
	const removePlayer = (playerIndex) => {
		if(!playerIndex) return;
		players.value.splice(playerIndex, 1);
		saveDataToLocalStorage();
	}



	const saveDataToLocalStorage = () => {
		localStorage.setItem('golfScorecard', JSON.stringify(players.value));
	}

	const clearScorecard = () => {
		localStorage.removeItem('golfScorecard');
		players.value = [];
		addPlayer();
	}

	// function updateTotals(playerIndex){
	// 	let out=0, inn=0;
	// 	for(let i=0;i<pars.length;i++){
	// 		const val = parseInt(document.getElementById(`p${playerIndex}-h${i+1}`).value);
	// 		const ind = document.getElementById(`ind${playerIndex}-h${i+1}`);
	// 		if(!isNaN(val)){
	// 			if(i<9) out+=val; else inn+=val;

	// 			const par = pars[i]; // assume tee boxes don't change par yet
	// 			const diff = val - par;
	// 			if(diff===0) ind.textContent="";
	// 			else if(diff===1) ind.textContent="⬜";
	// 			else if(diff===2) ind.textContent="⬜⬜";
	// 			else if(diff>2) ind.textContent="+"+diff;
	// 			else if(diff===-1) ind.textContent="⭕";
	// 			else if(diff<=-2) ind.textContent="⭕⭕";
	// 		} else { ind.textContent=""; }
	// 	}
	// 	document.getElementById(`out${playerIndex}`).textContent = out||"";
	// 	document.getElementById(`in${playerIndex}`).textContent = inn||"";
	// 	document.getElementById(`total${playerIndex}`).textContent = (out+inn)||"";
	// }


	onMounted(() => {
		loadDataFromLocalStorage();
	});
</script>

<style lang="scss" scoped>

	.Scorecard {


		td {
			input[type="number"] {
				width: 80px;
				text-align: center;
			}
		}
	}

	.Scorecard-tableHeadings th {
		text-align: center;
		vertical-align: middle;
	}

	td {
		text-align: center;
		vertical-align: middle;
	}

	input {
		margin: 0;
		font-size: 16px; // Needed to prevent zoom
	}

	select {
		margin: 0;
		min-width: 120px;
		font-size: 16px; // Needed to prevent zoom
	}

	.score {
		text-align: center;
		vertical-align: middle;
		font-size: var(--f3);
		font-weight: var(--fw6);
	}

	.score-indicator {
		font-size: var(--f1);
		font-weight: var(--fw6);
		color: red;
		color: blue;
	}

	.qr-code {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		span {
			font-size: var(--f2);
			font-weight: var(--fw6);
			text-transform: uppercase;
		}

		img {
			max-width: 250px;
		}
		width: 100%;
	}
</style>