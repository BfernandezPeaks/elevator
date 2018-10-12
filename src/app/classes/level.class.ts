import { Person } from './person.class';

export class Level {
  readonly number: number;
  isCalled = false;
  people: Person[] = new Array<Person>();

  constructor(number) {
    this.number = number;
  }
}
