import * as readline from 'readline';
import { Action, next, PokerGameState, tableActions } from '../src/poker';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

//set up a normal 1/2 game
let state: PokerGameState = {
	numberSeats: 7,
	actions: [
		{
			seat: 0,
			action: 'deal',
		},
		{
			seat: 1,
			action: 'blind',
			detail: 1,
		},
		{
			seat: 2,
			action: 'blind',
			detail: 2,
		},
	],
};

const { seat, actions } = next(state);

const start = async () => {
	tableActions(state);
	rl.question(
		`Actions Available for ${seat} ${JSON.stringify(actions)}?`,
		(answer) => {
			if (!actions.includes(<Action>answer)) console.log('You Suck');
			else console.log('good input');
		}
	);
	rl.close();
};

start();
