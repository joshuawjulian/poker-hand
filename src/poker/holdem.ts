import { stat } from 'fs';
import { isUndefined } from 'util';
import {
	Action,
	ActionDetail,
	PokerGameState,
	PokerHandStepper,
	Seat,
} from './types';

export type BettingRound = 'preflop' | 'flop' | 'turn' | 'river';

// Getting my functional programming on
export class HoldemHandStepper implements PokerHandStepper {
	/**
	 * Returns the next seat with action and the actions they can take
	 * @param state
	 * @returns
	 */
	next(state: PokerGameState): [Seat, Action[]] {
		if (state?.numberSeats === undefined)
			throw new Error('numberSeats is mandatory');

		if (!state.actions) throw new Error('actions is mandatory');

		if (state.numberSeats > 10 || state.numberSeats < 2)
			throw new Error('number of seats cant be >10 or <2');

		// new poker hand
		if (state.actions.length === 0)
			return [1, ['blind', 'bet', 'fold', 'check', 'straddle']];
	}

	push(action: ActionDetail, state: PokerGameState): PokerGameState {
		return state;
	}

	seatWithNextAction(
		state: PokerGameState,
		numberOfActions: number = undefined
	): Seat {
		if (numberOfActions === undefined) numberOfActions = state.actions.length;
		if (numberOfActions < 0)
			throw new Error(
				`numberOfActions(${numberOfActions}) must be 0 or positive`
			);
		if (numberOfActions > state.actions.length + 1)
			throw new Error(
				`numberOfActions(${numberOfActions}) is bigger than the number of actions in the state`
			);

		if (state.actions.length === 0) return 1;

		const lastActions: Action[] = this.lastActionForAllSeats(state);
		let seatPrev: Seat = 'D';
		let seatNext: Seat;
		for (let i = 0; i < numberOfActions; i++) {
			if (i === 0) seatNext = 1;
			else {
			}
		}
	}

	/**
	 *
	 * @param state
	 * test
	 * @returns an array of last actions for all seats, indexed by the seat number
	 */
	lastActionForAllSeats(
		state: PokerGameState,
		numberOfActions: number = undefined
	): Action[] {
		if (numberOfActions === undefined) numberOfActions = state.actions.length;
		if (numberOfActions < 0)
			throw new Error(
				`numberOfActions(${numberOfActions}) must be 0 or positive`
			);
		if (numberOfActions > state.actions.length + 1)
			throw new Error(
				`numberOfActions(${numberOfActions}) is bigger than the number of actions in the state`
			);

		let actions: Action[] = new Array<Action>(state.numberSeats).fill(null);

		for (let i = 0; i < numberOfActions; i++) {
			let currAction = state.actions[i];
			if (currAction.seat == 'D') actions[0] = currAction.action;
			else actions[currAction.seat] = currAction.action;
		}

		return actions;
	}

	shiftOneSeat(seat: number, numSeats: number): number {
		return (seat % numSeats) + 1;
	}
}
