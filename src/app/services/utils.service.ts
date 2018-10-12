import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

  public static random(max) {
    return Math.floor(Math.random() * max);
  }

}
