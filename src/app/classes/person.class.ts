import { Utils } from '../services/utils.service';

export class Person {
  readonly wantsToGo: number;

  constructor(levelCount: number, from: number) {
    do {
      this.wantsToGo = Utils.random(levelCount);
    } while (this.wantsToGo === from);
  }
}
