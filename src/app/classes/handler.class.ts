import { Elevator } from './elevator.class';
import { Level } from './level.class';
import { Person } from './person.class';
import { Utils } from '../services/utils.service';

export class Handler {
  Elevator: Elevator;
  Levels: Level[];

  constructor(levelCount: number) {
    this.Levels = this.buildLevels(levelCount);
    this.Elevator = new Elevator(levelCount);

    this.addRandomPerson(levelCount);
    this.call(this.Levels[levelCount]);
  }

  private buildLevels(levelCount: number): Level[] {
    const levels: Level[] = [];
    for (let i = 0; i <= levelCount; i++) {
      levels.unshift(new Level(i));
    }
    return levels;
  }

  public call(level: Level) {
    if (!level.isCalled) {
      level.isCalled = true;
      this.Elevator.addQueue(level);
    }
  }

  private addRandomPerson(count: number) {
    for (let i = 0; i < count; i++) {
      const index = Utils.random(this.Levels.length);
      const person = new Person(this.Levels.length, this.Levels[index].number);
      this.Levels[index].people.push(person);
    }
  }
}
