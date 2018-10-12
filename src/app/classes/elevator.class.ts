import { Level } from './level.class';
import { Person } from './person.class';
import { environment } from 'src/environments/environment';
import remove from 'lodash.remove';


export class Elevator {
  readonly LEVEL_COUNT: number;
  position: number;
  top: string;

  levelQueue: Level[] = new Array<Level>();
  people: Person[] = new Array<Person>();
  isMoving = false;

  constructor(levelCount: number, level: number = 0) {
    this.LEVEL_COUNT = levelCount;
    this.setPosition(level);
  }

  public addQueue(level: Level) {
    this.levelQueue.push(level);
    this.processQueue();
  }

  private processQueue() {
    if (!this.isMoving) {
      const level = this.levelQueue.shift();
      if (level) {
        this.isMoving = true;
        this.process(level);
      }
    }
  }

  private process(level: Level) {
    // elevator intel
    // const interLevel = this.levelQueue.find(l => this.position === l.number);
    // if (interLevel) {
    //   this.levelQueue.splice(this.levelQueue.indexOf(interLevel), 1);
    //   this.levelQueue.unshift(level);
    //   return this.deserving(interLevel);
    // }
    if (this.position === level.number) {
      return this.deserving(level);
    }
    const newPosition = this.position + (environment.ELEVATOR_SPEED * (this.position < level.number ? 1 : -1));
    this.setPosition(Math.round(newPosition * 100) / 100); // rounding (depend on ELEVATOR_SPEED)
    setTimeout(() => {
      this.process(level);
    }, environment.ELEVATOR_DELAY);
  }

  private deserving(level: Level) {
    level.isCalled = false;
    // drop
    setTimeout(() => {
      this.dropPeople(level);
    }, environment.ELEVATOR_WAITING * (1 / 3));
    // take
    setTimeout(() => {
      this.takePeople(level);
    }, environment.ELEVATOR_WAITING * (2 / 3));
    // move next
    setTimeout(() => {
      this.isMoving = false;
      this.processQueue();
    }, environment.ELEVATOR_WAITING);
  }

  private dropPeople(level: Level) {
    remove(this.people, (p) => p.wantsToGo === level.number);
  }

  private takePeople(level: Level) {
    for (let i = environment.ELEVATOR_SLOT - this.people.length; i > 0 && level.people.length; i--) {
      const person = level.people.shift();
      this.people.push(person);
    }
  }

  private setPosition(position: number) {
    this.position = position;
    this.top = `${(this.LEVEL_COUNT - this.position) * environment.LEVEL_HEIGHT}px`;
  }
}

