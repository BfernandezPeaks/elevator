import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Handler } from './classes/handler.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  CAGE_HEIGHT = `${(environment.LEVEL_COUNT + 1) * environment.LEVEL_HEIGHT + 1}px`;

  Handler: Handler = new Handler(environment.LEVEL_COUNT);

}
