import {
	lastActionOfEverySeat,
	PokerGameState,
	printActionList,
	seatsThatHaveAction,
	streetEndsAtIndex,
	streetStartsAtIndex,
	whichStreet,
} from '../src/poker';

const state: PokerGameState = {
	numberSeats: 5,
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
		{
			seat: 3,
			action: 'bet',
			detail: 10,
		},
		{
			seat: 4,
			action: 'fold',
		},
		{
			seat: 5,
			action: 'call',
			detail: 10,
		},
		{
			seat: 1,
			action: 'fold',
		},
		{
			seat: 2,
			action: 'call',
			detail: 10,
		},
		{
			seat: 0,
			action: 'deal',
			detail: [
				{ rank: 'A', suit: 'c' },
				{ rank: 'K', suit: 'd' },
				{ rank: 'J', suit: 'c' },
			],
		},
		{
			seat: 2,
			action: 'check',
		},
	],
};

let lastActions = lastActionOfEverySeat(state);

printActionList(lastActions);

console.log(`Current Street = ${whichStreet(state)}`);
console.log(
	`Street Starts at = idx[${streetStartsAtIndex(whichStreet(state), state)}]`
);
console.log(
	`Street Ends at = idx[${streetEndsAtIndex(whichStreet(state), state)}]`
);
console.log(
	`Seats That Have Action = ${JSON.stringify(
		seatsThatHaveAction(state),
		null,
		2
	)}`
);
//export type Street = typeof Street[keyof typeof Street];
