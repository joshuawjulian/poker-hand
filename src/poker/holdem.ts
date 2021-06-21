import { stat } from 'fs';
import { Action, ActionDetail, PokerGameState, PokerHandStepper, Seat } from './types';


export type bettingRound = 'preflop' | 'flop' | 'turn' | 'river';

// Getting my functional programming on
export class HoldemHandStepper implements PokerHandStepper {

  next(state:PokerGameState):[Seat, Action[]] {

    if(state?.numberSeats === undefined)
      throw new Error('numberSeats is mandatory');

    if(!state.actions)
      throw new Error('actions is mandatory');

    if(state.numberSeats > 10 || state.numberSeats < 2)
      throw new Error('number of seats cant be >10 or <2');

    // new poker hand
    if(state.actions.length === 0)
      return [1,['blind', 'bet', 'fold', 'check']];
    
  }


  push(action:ActionDetail, state:PokerGameState):PokerGameState {

    return state;
  }
}