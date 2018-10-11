import { Component } from '@angular/core';

const LEVEL_COUNT = 9;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Handler: Handler = new Handler(LEVEL_COUNT);

}

// TODO: lib
function random(max) {
  return Math.floor(Math.random() * max);
}


class Handler {
  Elevator: Elevator;
  Levels: Level[];
  People: People;

  constructor(levelCount: number) {
    this.Levels = this.buildLevels(levelCount);
    this.Elevator = new Elevator(levelCount);
    this.People = new People(levelCount);
  }

  private buildLevels(levelCount: number): Level[] {
    let levels: Level[] = [];
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
}


class Elevator {
  readonly ELEVATOR_DELAY = 30;     // timeout delay
  readonly ELEVATOR_WAITING = 1000; // waiting time
  readonly ELEVATOR_SPEED = 0.05;   // speed in % px
  readonly LEVEL_HEIGHT = 100;      // level height in px

  readonly LEVEL_COUNT: number;
  position: number;
  top: string;

  levelQueue: Level[] = [];
  isMoving: boolean = false;

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
    const interLevel = this.levelQueue.find(l => this.position === l.number);
    if (interLevel) {
      this.levelQueue.splice(this.levelQueue.indexOf(interLevel), 1);
      this.levelQueue.unshift(level);
      // this.addQueue(level);
      return this.deserving(interLevel);
    }
    if (this.position === level.number) {
      return this.deserving(level);
    }
    const newPosition = this.position + (this.ELEVATOR_SPEED * (this.position < level.number ? 1 : -1));
    this.setPosition(Math.round(newPosition * 100) / 100); // rounding (depend on ELEVATOR_SPEED)
    setTimeout(() => {
      this.process(level);
    }, this.ELEVATOR_DELAY);
  }

  private deserving(level: Level) {
    level.isCalled = false;
    setTimeout(() => {
      this.isMoving = false;
      this.processQueue();
    }, this.ELEVATOR_WAITING);
  }

  private setPosition(position: number) {
    this.position = position;
    this.top = `${(this.LEVEL_COUNT - this.position) * this.LEVEL_HEIGHT}px`;
  }
}


class Level {
  readonly number: number;
  isCalled: boolean = false;

  constructor(number) {
    this.number = number;
  }
}


class People {
  Queues: Person[][];

  constructor(levelCount: number) {
    this.Queues = [];
    for (let i = 0; i <= levelCount; i++) {
      this.Queues.push([]);
    }
    // TEST
    for (let i = 0; i < 10; i++) {
      this.addRandomPerson();
    }
  }

  addRandomPerson() {
    const index = random(this.Queues.length);
    this.Queues[index].push(new Person(this.Queues.length, index));
  }
}


class Person {
  wantsToGo: number;

  constructor(levelCount: number, from: number) {
    this.wantsToGo = from;
    while (this.wantsToGo === from) {
      this.wantsToGo = random(levelCount);
    }
  }
}
