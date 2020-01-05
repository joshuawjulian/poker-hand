export class Action {

  public static getAction(shortName:string):Action {
    if(shortName in this.ACTIONS) {
      return this.ACTIONS[shortName];
    } else {
      throw new Error('an action must be a real action');
    }
  }

  // the goal is to be as flexible as possible
  private static ACTIONS: {[index:string]: Action} = {
    'blind': new Action('blind', 'Post Blind'),
    'straddle': new Action('straddle', 'Post Straddle'),
    'ante': new Action('ante', 'Post Ante'),
    'fold': new Action('fold', 'Fold'),
    'bet': new Action('bet', 'Bet'),
    'check': new Action('check', 'Check'),
    'call': new Action('call', 'Call'),
    'preflop': new Action('preflop', 'Pre-Flop', false),
    'flop': new Action('flop', 'Flop', false),
    'turn': new Action('turn', 'Turn', false),
    'river': new Action('river', 'River', false),
  }

  public shortName: string;
  public longName: string;
  public playerAction: boolean;

  private constructor(shortName: string, longName: string, playerAction:boolean = true) {
    this.shortName = shortName;
    this.longName = longName;
    this.playerAction = playerAction;
  }

  static getAllActions(): Action[] {
    let a:Action[] = [];
    for(let act in this.ACTIONS) {
      a.push(this.ACTIONS[act]);
    }
    return a;
  }

  static dealerActions():Action[] {
    return [
      Action.getAction('flop'), 
      Action.getAction('turn'), 
      Action.getAction('river')
    ];
  }

  static facingBetActions():Action[] {
    return [
      Action.getAction('call'),
      Action.getAction('bet'),
      Action.getAction('fold')
    ];
  }

  static facingNonbetActions():Action[] {
    return [
      Action.getAction('check'),
      Action.getAction('bet'),
      Action.getAction('fold')
    ];
  }

  public toString():string {
    return `Action(${this.shortName})`;
  }

}