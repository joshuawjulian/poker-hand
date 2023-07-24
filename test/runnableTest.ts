import { PokerGameState, tableActions } from '../src/poker';

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
		{
			seat: 3,
			action: 'bet',
			detail: 100,
		},
		{ seat: 5, action: 'call', detail: 100 },
		{ seat: 2, action: 'fold' },
	],
};

tableActions(state);
