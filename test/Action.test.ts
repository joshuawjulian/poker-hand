import {Action} from '../src/Action';

import {expect} from 'chai';
import 'mocha';
import { createReadStream } from 'fs';

describe('Actions', () => {
  it('getAllActions()', () => {
    expect(Action.getAllActions()).to.have.lengthOf(11);
  });
  it('All Actions should Equal Themselves', () => {
    let act:Action;
    let acts:Action[] = Action.getAllActions();
    for(let i = 0; i < acts.length; i++) {
      act = Action.getAction(acts[i].shortName);
      expect(act === acts[i]).to.be.true;
    }
  });
})