import { stat } from 'fs';
import { seatsThatHaveAction, Street } from '.';
import type {
	Action,
	ActionDetail,
	PokerGameState,
	PokerEngine,
	Seat,
} from './types';

export type BettingRound = 'preflop' | 'flop' | 'turn' | 'river';

// Getting my functional programming on
export function next(state: PokerGameState): [Seat, Action[]] {
	return [0, ['deal']];
}

export function push(
	action: ActionDetail,
	state: PokerGameState
): PokerGameState {
	return state;
}

export function clipStateActions(
	state: PokerGameState,
	idx: number
): PokerGameState {
	let newState = Object.assign({}, state);
	newState.actions = newState.actions.slice(0, idx);
	return newState;
}

/**
 *
 * @param state
 * @returns Array of Action where the index is the seat number.
 * 					index 0 is the dealer
 */
export function lastActionOfEverySeat(state: PokerGameState): ActionDetail[] {
	let lastActions = new Array(state.numberSeats + 1);
	lastActions.fill(null);

	state.actions.forEach((action: ActionDetail, index: number) => {
		lastActions[action.seat] = action;
	});

	return lastActions;
}

export const printActionList = (actions: ActionDetail[]): void => {
	actions.forEach((act, idx) => {
		console.log(`${idx} = ${JSON.stringify(act)}`);
	});
};

export function howManyDealerActions(state: PokerGameState): number {
	return state.actions.filter((action) => {
		return action.seat === 0;
	}).length;
}

export function whichStreet(state: PokerGameState): Street {
	return numberToStreet(howManyDealerActions(state));
}

export function numberToStreet(street: number): Street {
	switch (street) {
		case 1:
			return 'preflop';
		case 2:
			return 'flop';
		case 3:
			return 'turn';
		case 4:
			return 'river';
		case 5:
			return 'showdown';
	}
}

export function streetToNumber(street: Street): number {
	switch (street) {
		case 'preflop':
			return 1;
		case 'flop':
			return 2;
		case 'turn':
			return 3;
		case 'river':
			return 4;
		case 'showdown':
			return 5;
	}
	return 0;
}

export function streetStartsAtIndex(
	streetSearching: Street,
	state: PokerGameState
): number {
	let idx = -1;
	//verify we are there first
	const streetSearchingNum = streetToNumber(streetSearching);
	let currentStreet = whichStreet(state);
	if (streetSearchingNum > streetToNumber(currentStreet))
		throw new Error('Street searching for is not in current game state');

	let dealerActions = 0;
	state.actions.forEach((action, currIdx) => {
		if (action.seat === 0) {
			dealerActions++;
			if (dealerActions === streetSearchingNum) idx = currIdx;
		}
	});
	return idx;
}

export function streetEndsAtIndex(
	streetSearching: Street,
	state: PokerGameState
): number {
	let idx = -1;
	//verify we are there first
	const streetSearchingNum = streetToNumber(streetSearching);
	let currentStreet = whichStreet(state);
	if (streetSearchingNum > streetToNumber(currentStreet))
		throw new Error('Street searching for is not in current game state');

	if (streetSearching === currentStreet) return state.actions.length - 1;

	let dealerActions = 0;
	state.actions.forEach((action, currIdx) => {
		if (action.seat === 0) {
			dealerActions++;
			if (dealerActions - 1 === streetSearchingNum) idx = currIdx - 1;
		}
	});
	return idx;
}

export function seatsNotFolded(state: PokerGameState): Seat[] {
	//create array of all
	let seatsNotFolded = Array.from(Array(state.numberSeats + 1).keys());
	lastActionOfEverySeat(state).forEach((actionDetail) => {
		if (actionDetail.action === 'fold')
			seatsNotFolded.splice(
				seatsNotFolded.indexOf(<number>actionDetail.seat),
				1
			);
	});
	return seatsNotFolded;
}

export function seatsThatHaveActionThisStreet(state: PokerGameState): Seat[] {
	let street = whichStreet(state);
	let idxStartOfStreet = streetStartsAtIndex(street, state);
	let idxEndOfStreet = streetEndsAtIndex(street, state);
	let seatsLeftToAct = seatsNotFolded(state);
	for (let i = idxStartOfStreet; i <= idxEndOfStreet; i++) {
		const action = state.actions[i];
	}
}
