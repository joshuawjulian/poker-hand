
export type Rank = '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'T'|'J'|'Q'|'A';
export type Suit = 'c'|'d'|'h'|'s';

export interface Card {
  rank:Rank;
  suit:Suit;
}

export type Seat = number | 'D';

export type PlayerAction = 'fold'|'check'|'bet'|'call'|'blind'|'straddle'|'ante';
export type DealerAction = 'deal'|'end'|'options';

export type Action = PlayerAction | DealerAction | null;

export interface ActionDetail {
  seat: Seat;
  action:Action;
  detail?: Card | Card[] | number;
}

export interface PokerGameState {
  numberSeats:number;
  actions:ActionDetail[];
}

export interface PokerHandStepper {
  /**
   * Who the next action is on, and the actions availble to them.
   * @param state 
   */
  next(state:PokerGameState):[Seat,Action[]];  


  /**
   * Push the next action with verification
   * @param action 
   * @param state 
   */
  push(action:ActionDetail, state:PokerGameState):PokerGameState;
}