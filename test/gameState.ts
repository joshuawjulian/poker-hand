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

basicFullHand[2] = JSON.parse(JSON.stringify(basicFullHand[1]));
basicFullHand[2].actions.push(
  {
    seat:4,
    action: 'fold'
  }
);

basicFullHand[2].actions.push(
  {
    seat: 5,
    action: 'bet',
    detail: 15
  }
);

basicFullHand[2].actions.push(
  {
    seat: 6,
    action: 'bet',
    detail: 40
  }
)






export {basicFullHand};