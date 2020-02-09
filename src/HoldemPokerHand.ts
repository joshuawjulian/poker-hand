import { Action } from "./Action";

export class HoldemPokerHand {

  static tojson(h:HoldemPokerHand):IHoldemPokerHand {

  }

  static fromjson(h:IHoldemPokerHand):HoldemPokerHand {
    
  }

  public seatActionIsOn(step:number):number {

    return 1;
  }

  public actionsAllowedAtStep(step:number):void {
    
  }
}

export interface IHoldemPokerHand {
  seats: number,
  sb: number,
  bb: number,
  actions: IHoldemAction[]
}

export interface IHoldemAction {
  seatNum: number,
  action: Action
}