import { Street } from './types';
import type { Action, ActionDetail, PokerGameState } from './types';
import { rotateArrayFTB } from '.';

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
	for (let i = 0; i < state.numberSeats + 1; i++) {
		lastActions[i] = {
			seat: i,
			action: null,
		};
	}

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

export function seatsNotFolded(state: PokerGameState): number[] {
	//create array of all
	let seatsNotFolded = Array.from(Array(state.numberSeats + 1).keys());
	lastActionOfEverySeat(state).forEach((actionDetail) => {
		if (actionDetail.action === 'fold')
			seatsNotFolded.splice(seatsNotFolded.indexOf(actionDetail.seat), 1);
	});
	return seatsNotFolded;
}

/**
 *	List all the seats that have an action to make on the latest street
 * @param state
 */
export const seatsThatHaveAction = (state: PokerGameState): number[] => {
	let street = whichStreet(state);
	let idxStartOfStreet = streetStartsAtIndex(street, state);

	let seatsLeftToAct = seatsNotFolded(state);
	for (let i = 0; i <= idxStartOfStreet; i++) {
		const action = state.actions[i];
		if (action?.allin || action.action === 'fold') {
			const idxOfSeat = seatsLeftToAct.indexOf(action.seat);
			if (idxOfSeat > -1) seatsLeftToAct.splice(idxOfSeat, 1);
		}
	}

	return seatsLeftToAct;
};

export const seatsThatHaveNotActed = (state: PokerGameState): number[] => {
	let street = whichStreet(state);
	let idxStartOfStreet = streetStartsAtIndex(street, state);
	let seatsWithAction = seatsThatHaveAction(state);
	for (let i = idxStartOfStreet; i < state.actions.length; i++) {
		const action = state.actions[i];
		if (
			action.action !== 'straddle' &&
			action.action !== 'blind' &&
			action.action !== 'ante'
		) {
			const idxOfSeat = seatsWithAction.indexOf(action.seat);
			if (idxOfSeat > -1) seatsWithAction.splice(idxOfSeat, 1);
		}
	}
	return seatsWithAction;
};

/**
 * Checks if all seats that have action in the current round of poker
 * have atleast one action
 * @param state The poker game state to run on
 * @returns {boolean} If all seats have acted atleast once
 */
export const allSeatsActed = (state: PokerGameState): boolean => {
	return seatsThatHaveNotActed(state).length === 0;
};

export const currOrderOfActions = (state: PokerGameState): number[] => {
	let seats = seatsThatHaveAction(state);
	seats.splice(0, 1); // get rid of the dealer
	let street = whichStreet(state);
	let idxStartOfStreet = streetStartsAtIndex(street, state);

	for (let i = idxStartOfStreet; i < state.actions.length; i++) {
		const action = state.actions[i];
		if (action.seat === seats[0]) {
			seats = rotateArrayFTB(seats);
		}
	}

	return seats;
};

/**
 *
 * @param state
 * @returns Seat that has the last most aggressive action THE
 * CURRENT BETTING ROUND. If it returns 0, that means no aggressive action has
 * been made (all check/call)
 */
export const seatLastAggressiveAction = (state: PokerGameState): number => {
	let street = whichStreet(state);
	let idxStartOfStreet = streetStartsAtIndex(street, state);
	let seatsWithAction = seatsThatHaveAction(state);
	let seatLastAggAction = seatsWithAction[0];

	for (let i = idxStartOfStreet; i < state.actions.length; i++) {
		const action = state.actions[i];
		if (['bet', 'straddle', 'blind'].includes(action.action)) {
			seatLastAggAction = action.seat;
		}
	}

	return seatLastAggAction;
};

export const nextSeat = (state: PokerGameState): number => {
	const lastActions = lastActionOfEverySeat(state);
	const lastAggAction = seatLastAggressiveAction(state);
	let orderOfActions = currOrderOfActions(state);

	if (!allSeatsActed(state)) return orderOfActions[0];

	if (orderOfActions[1] === lastAggAction) return orderOfActions[0];

	return 0;
};

// Getting my functional programming on
export function next(state: PokerGameState): {
	seat: number;
	actions: Action[];
} {
	let seat = 0;
	let actions: Action[] = ['deal'];
	const street = whichStreet(state);
	const lastAggressiveAction = seatLastAggressiveAction(state);
	const lastActions = lastActionOfEverySeat(state);
	let orderOfActions = currOrderOfActions(state);

	seat = orderOfActions[0];
	if (lastAggressiveAction === 0) {
		actions = ['check', 'bet', 'fold'];
	} else {
		if (
			['bet', 'straddle', 'blind'].includes(
				lastActions[lastAggressiveAction].action
			)
		) {
			actions = ['call', 'bet', 'fold'];
		}
	}

	//check if all aggressive actions have been replied to
	if (lastAggressiveAction == orderOfActions[0]) {
		//dealer action now
		seat = 0;
		if (street === 'river') actions = ['end'];
		else actions = ['deal'];
		return { seat, actions };
	}

	return { seat, actions };
}
/**
 *
 * @param state
 * @param startIndex The index to start with (after all preflop setup has started)
 * @returns
 */
export const tableActions = (state: PokerGameState) => {
	let table = [];
	for (let i = 0; i < state.actions.length; i++) {
		const currState = clipStateActions(state, i);

		table.push({
			actionIndex: i,
			seat: state.actions[i].seat,
			action: state.actions[i].action,
			detail: JSON.stringify(state.actions[i].detail) || null,
			potSize: potSize(currState),
		});
	}

	console.table(table);
};

export const printAll = (state: PokerGameState) => {
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
		`SeatsNotFolded = ${JSON.stringify(seatsNotFolded(state), null, 2)}`
	);
	console.log(
		`Seats That Have Action = ${JSON.stringify(
			seatsThatHaveAction(state),
			null,
			2
		)}`
	);
	console.log(
		`seatsThatHaveNotActed = ${JSON.stringify(
			seatsThatHaveNotActed(state),
			null,
			2
		)}`
	);
	console.log(
		`allSeatsActed = ${JSON.stringify(allSeatsActed(state), null, 2)}`
	);
	console.log(`currOrderOfActions = ${currOrderOfActions(state)}`);
	console.log(`seatLastAggressiveAction = ${seatLastAggressiveAction(state)}`);
	console.log(`nextSeat = ${nextSeat(state)}`);
	console.log(`next = ${JSON.stringify(next(state))}`);
};

export const largestAmount = (state: PokerGameState) => {
	const lastActions = lastActionOfEverySeat(state);
	const lastAggAction = seatLastAggressiveAction(state);

	if (lastAggAction === 0) return 0;

	if (
		['bet', 'blind', 'straddle'].includes(lastActions[lastAggAction].action)
	) {
		return lastActions[lastAggAction].detail;
	}
};

export const potSizeByStreet = (state: PokerGameState) => {
	let street = whichStreet(state);
	let streetNum = streetToNumber(street);
	let pot = new Array(streetNum + 1);
	for (let i = 0; i < pot.length; i++) pot[i] = 0;

	for (let currStreetNum = 1; currStreetNum <= streetNum; currStreetNum++) {
		let allActionsBySeat = allActionsBySeatForStreet(
			state,
			numberToStreet(currStreetNum)
		);
		for (let seatNum = 1; seatNum < allActionsBySeat.length; seatNum++) {
			while (allActionsBySeat[seatNum].length > 0) {
				const actDet = allActionsBySeat[seatNum].pop();
				if (['call', 'straddle', 'bet', 'blind'].includes(actDet.action)) {
					pot[currStreetNum] += actDet.detail;
					break;
				}
			}
		}
	}

	return pot;
};

export const potSize = (state: PokerGameState) => {
	let pot = 0;
	potSizeByStreet(state).forEach((value) => {
		pot += value;
	});
	return pot;
};

/**
 *
 * @param state
 * @param street
 * @returns an array of ActionDetail indexed by seat for all actions on that street
 */
export const allActionsBySeatForStreet = (
	state: PokerGameState,
	street: Street
): ActionDetail[][] => {
	let actions = new Array(state.numberSeats + 1);
	for (let i = 0; i < actions.length; i++) actions[i] = [];
	let idxStartOfStreet = -1;
	let idxEndOfStreet = -1;
	try {
		idxStartOfStreet = streetStartsAtIndex(street, state);
		idxEndOfStreet = streetEndsAtIndex(street, state);
	} catch (err) {
		throw new Error(err);
	}
	for (let i = idxStartOfStreet; i <= idxEndOfStreet; i++) {
		const action = state.actions[i];
		actions[action.seat].push(action);
	}
	return actions;
};

export const contributionBySeat = (state: PokerGameState) => {
	let contri = new Array(state.numberSeats + 1);
	contri.fill(0);
	let street = whichStreet(state);
	let streetNum = streetToNumber(street);
	for (let currStreetNum = 1; currStreetNum <= streetNum; currStreetNum++) {
		let allActionsBySeat = allActionsBySeatForStreet(
			state,
			numberToStreet(currStreetNum)
		);
		for (let seatNum = 1; seatNum < allActionsBySeat.length; seatNum++) {
			while (allActionsBySeat[seatNum].length > 0) {
				const actDet = allActionsBySeat[seatNum].pop();
				if (['call', 'straddle', 'bet', 'blind'].includes(actDet.action)) {
					contri[actDet.seat] += actDet.detail;
					break;
				}
			}
		}
	}
	return contri;
};

export const push = (
	ad: ActionDetail,
	state: PokerGameState
): PokerGameState => {
	const { seat, actions } = next(state);
	if (!actions.includes(ad.action) || ad.seat !== seat)
		throw new Error('Illegal Action or Seat');

	if (ad.action === 'call') {
		const largestAmt = largestAmount(state);
		if (!(ad.detail === largestAmt || (ad.detail <= largestAmt && ad.allin))) {
			throw new Error(
				'Call Amount must be equal to the largest bet or an allin'
			);
		}
	} else if (ad.action === 'bet') {
		const largestAmt = largestAmount(state);
		if (ad.detail <= largestAmt)
			throw new Error('Bet amount must be a full bet');
	}

	state.actions.push(ad);
	return state;
};
