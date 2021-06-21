import { expect } from 'chai';

import { HoldemHandStepper, PokerGameState } from '../src/poker';

describe('Holdem Poker', () => {
  const h:HoldemHandStepper = new HoldemHandStepper();
  describe('#next', () => {
    it('should return dealer options with a 1 action list', () => {
      let state:PokerGameState = {
        numberSeats: 6,
        actions: []
      }
      const result = h.next(state);
      expect(result).to.be.an.instanceof(Array);
      const [seat, actions] = result;
      expect(seat).to.equal('D');
      expect(actions).to.deep.equal(['deal']);
    })
  })
})