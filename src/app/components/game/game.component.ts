import {Component, Input, OnInit} from '@angular/core';
import {QuizModel} from '../../models/quiz.model';
import {Router} from '@angular/router';
import {PlayerService} from '../../ressources/player.service';
import {PlayerModel} from '../../models/player.model';
import {RoomModel} from '../../models/room.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() quiz: any;
  @Input() vs: boolean;
  @Input() room: RoomModel;

  index: number;
  score: number;
  result = false;
  answer = false;
  listQuestions: QuizModel[] = [];
  correctAnswer: string;
  selectedAnswer: string;
  isMobile: boolean;
  opponentPlayer: PlayerModel;
  errMsg: string;

  constructor(private router: Router,
              private playerService: PlayerService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.startQuiz();
  }

  startQuiz() {
    this.listQuestions = this.quiz.results;
    this.index = 0;
    this.score = 0;
  }

  parseQuestion(res: string) {
    return res.replace(/&apos;/g, '\'')
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/&deg;/g, '°')
        .replace(/&#039;/g, '\'')
        .replace(/&rsquo;/g, '\'')
        .replace(/&eacute;/g, 'é')
        .replace(/&agrave;/g, 'à')
        .replace(/&aelig;/g, 'æ')
        .replace(/&egrave;/g, 'è')
        .replace(/&ecirc;/g, 'ê')
        .replace(/&epsilon;/g, 'ε')
        .replace(/&Phi;/g, 'Φ')
        .replace(/&phi;/g, 'φ')
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&ocirc;/g, 'ô');
  }

  nextQuestion() {
    this.index += 1;
    this.answer = false;
  }

  validate(res: string) {
    this.correctAnswer = this.listQuestions[this.index].correct_answer.toUpperCase();
    this.selectedAnswer = res.toUpperCase();
    if (this.selectedAnswer === this.correctAnswer) {
      this.score++;
    }
    this.answer = true;
  }

  displayResult() {
    this.result = true;
  }


  displayVSResult() {
    this.result = true;
    // this.playerService.updateScore(sessionStorage.getItem('playerId'), this.score).subscribe();
  }


  goToCategories() {
    sessionStorage.clear();
    this.router.navigate(['all']).then();
  }

  restart() {
    window.location.reload();
  }
}
