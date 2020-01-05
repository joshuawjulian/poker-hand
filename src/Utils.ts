
export function getRandomInt(max:number) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Selects a random single character from a string
 * @param input The input string
 */
export function getRandomChar(input:string):string {
  if(input.length < 1) throw new Error('String must be atleast 1 character long');
  return input.charAt(getRandomInt(input.length));
}