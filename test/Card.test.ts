import {Card} from '../src/Card';
import {getRandomChar} from '../src/Utils';

import {expect} from 'chai';
import 'mocha';
import { createReadStream } from 'fs';

describe('Card Construction', () => {
  it('should construct with all Cards', () => {
    expect(() => {
      for(let rank:number = 0; rank < Card.allRanks.length; rank++){
        for(let suit:number = 0; suit < Card.allSuits.length; suit++) {
          let c:Card = new Card(Card.allRanks.charAt(rank) + Card.allSuits.charAt(suit));
          //console.log(c.toString());
        }
      }
    }).to.not.throw();
  });
  it('should not construct with lengths > 2', () => {
    expect(() => {
      new Card('AAc');
    }).to.throw();
  });
})