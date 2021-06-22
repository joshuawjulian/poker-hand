import { HoldemHandStepper, PokerGameState } from '../src/poker';

//file full of json for game state

let basicFullHand:PokerGameState[] = [];

basicFullHand[0] = {
  numberSeats: 6,
  actions: [
    {
      seat: 1,
      action: 'blind',
      detail: 1
    },
    {
      seat: 2,
      action: 'blind',
      detail: 2
    }
  ]
}

basicFullHand[1] = JSON.parse(JSON.stringify(basicFullHand[0]));
basicFullHand[1].actions.push(
  {
    seat: 3,
    action: 'call',
    detail: 2
  }
);




export {basicFullHand};