import {expect, jest, test} from '@jest/globals';
import { HoldemStateType } from './HoldemState';

let basicOneTwoSixMax:HoldemStateType = {
	setup: {
		numberOfPlayers: 6,
		blindActions: [{
			seat: 1,
			action:'blind',
			amount: 1
		},
		{
			seat: 2,
			action: 'blind',
			amount: 2
		},
	],
	startOrder: [],
	startingStacks: [
		{seat: 1, stack: 200},
		{seat: 2, stack: 200},
		{seat: 3, stack: 200},
		{seat: 4, stack: 200},
		{seat: 5, stack: 200},
		{seat: 6, stack: 200},
	],

	},
	actions: []
}

describe('setting up a game', ()=> {
  test('1+1 = 2', () => {
    expect(1+1).toBe(2);
  })
})