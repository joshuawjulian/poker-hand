export class Card {

  static allRanks:string = 'A23456789TJKQ';
  static allSuits:string = 'cdhs';

  rank:string;
  suit:string;

  constructor (cardStr:string) {
    if(cardStr.length !== 2)
      throw new Error('Card must be 2 characters');

    this.rank = cardStr.charAt(0).toUpperCase();
    this.suit = cardStr.charAt(1).toLowerCase();
    if(Card.allRanks.indexOf(this.rank) == -1) throw new Error(`Rank (${this.rank}) must be in ${Card.allRanks}`);
    if(Card.allSuits.indexOf(this.suit) == -1) throw new Error(`Suit (${this.suit}) must be in ${Card.allSuits}`);
  }

  toString():string {
    return this.rank + this.suit;
  }

}
