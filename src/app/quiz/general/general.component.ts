import { Component } from '@angular/core';
import {GeneralService} from '../../ressource/general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {
  quiz: Array<object> = [];
  game = false;

  constructor(private generalService: GeneralService) { }

  generalEasyQuiz() {
    this.generalService.generalEasy().subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
  generalAnyQuiz() {
    this.generalService.generalAny().subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
  generalMediumQuiz() {
    this.generalService.generalMedium().subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }
}
