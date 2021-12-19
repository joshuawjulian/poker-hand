export type Rank =
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| 'T'
	| 'J'
	| 'Q'
	| 'K'
	| 'A';
export type Suit = 'c' | 'd' | 'h' | 's';

export interface Card {
	rank: Rank;
	suit: Suit;
}

// Seat 0 === dealer also
export type Seat = number;

/**
 * There is some deliberation if we want to seperate bet/call.
 * Putting chips in the pot is the same action. I am unsure how to model it.
 */
export type PlayerAction =
	| 'fold'
	| 'check'
	| 'bet'
	| 'call'
	| 'blind'
	| 'straddle'
	| 'draw'
	| 'ante';
export type DealerAction = 'deal' | 'end' | 'options';

export type Action = PlayerAction | DealerAction | null;

export type Street = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export interface ActionDetail {
	seat: Seat;
	action: Action;
	detail?: Card | Card[] | number;
	allin?: boolean;
}

export interface PokerGameState {
	numberSeats: number;
	nonStandardOrder?: Seat[];
	actions: ActionDetail[];
}

export interface PokerEngine {
	/**
	 * Who the next action is on, and the actions availble to them.
	 * @param state the current game state to run on
	 * @returns which seat and the list of actions available
	 */
	next(state: PokerGameState): [Seat, Action[]];

	/**
	 * Push the next action with verification
	 * @param action The next action to the game state
	 * @param state returns the updated game state
	 */
	push(action: ActionDetail, state: PokerGameState): PokerGameState;
}
