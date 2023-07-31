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
		startOrder: []

	},
	actions: []
}

describe('setting up a game', ()=> {
  test('1+1 = 2', () => {
    expect(1+1).toBe(2);
  })
})