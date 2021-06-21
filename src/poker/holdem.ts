import { Action, ActionDetail, PokerGameState, PokerHandStepper, Seat } from './types';

// Getting my functional programming on
export class HoldemHandStepper implements PokerHandStepper {
    next(state:PokerGameState):[Seat, Action[]] {
      if(state.actions.length === 0)
        return ['D',['deal']];

      
    }
}