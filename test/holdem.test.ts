import { expect } from 'chai';

import { Action, HoldemHandStepper, PokerGameState, Seat } from '../src/poker';
import { basicFullHand } from './gameState';

const h: HoldemHandStepper = new HoldemHandStepper();

describe('Holdem Poker', () => {
	describe('#next', () => {
		it('throw when seats are <2', () => {
			const state: PokerGameState = {
				numberSeats: 1,
				actions: [],
			};
			expect(() => h.next(state)).to.throw(Error);
		});

		it('throw when seats are >10', () => {
			const state: PokerGameState = {
				numberSeats: 11,
				actions: [],
			};
			expect(() => h.next(state)).to.throw(Error);
		});

		it('return dealer options with a 0 action list', () => {
			let state: PokerGameState = {
				numberSeats: 6,
				actions: [],
			};
			const result = h.next(state);
			expect(result).to.be.an.instanceof(Array);
			const [seat, actions] = result;
			expect(seat).to.equal(1);
			expect(actions).to.deep.equal([
				'blind',
				'bet',
				'fold',
				'check',
				'straddle',
			]);
		});
	});

	describe('#shiftOneSeat', () => {
		it('should shift one seat and wrap when needed', () => {
			expect(h.shiftOneSeat(1, 6)).to.equal(2);
			expect(h.shiftOneSeat(5, 6)).to.equal(6);
			expect(h.shiftOneSeat(6, 6)).to.equal(1);
			expect(h.shiftOneSeat(2, 2)).to.equal(1);
			expect(h.shiftOneSeat(1, 2)).to.equal(2);
		});
	});

	describe('#seatWithNextAction', () => {
		let seat: Seat = h.seatWithNextAction(basicFullHand[2]);
		it('return 1 with the basicFullHand[2]', () => {
			expect(seat).to.equal(1);
		});
	});

	describe('#lastActionForAllSeats', () => {
		it('basic example', () => {
			let lastActions: Action[] = h.lastActionForAllSeats(basicFullHand[0]);
			expect(lastActions[1]).to.equal('blind');
			expect(lastActions[2]).to.equal('blind');
			expect(lastActions[3]).to.equal(null);
		});
	});
});
