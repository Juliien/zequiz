import {Component, Input, OnInit} from '@angular/core';
import {QuizModel} from '../../models/quiz.model';
import {Router} from '@angular/router';
import {PlayerService} from '../../ressources/player.service';
import {PlayerModel} from '../../models/player.model';
import {RoomModel} from '../../models/room.model';
import {RoomService} from '../../ressources/room.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() quiz: Array<object>;
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
  displaySpinner: boolean;
  zp: number;
  errMsg: string;

  constructor(private router: Router,
              private playerService: PlayerService,
              private roomService: RoomService) { }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 765;
    this.displaySpinner = false;
    this.startQuiz();
  }

  startQuiz() {
    this.listQuestions = this.quiz['results'];
    this.index = 0;
    this.score = 0;
    this.zp = 0;
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
    this.calculateZp(false);
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

  calculateZp(isVs: boolean){
    switch (this.score) {
      case 0:
        this.zp = 14;
        break;
      case 1:
        this.zp = 12;
        break;
      case 2:
        this.zp = 10;
        break;
      case 3:
        this.zp = 8;
        break;
      case 4:
        this.zp = 6;
        break;
      case 5:
        this.zp = 10;
        break;
      case 6:
        this.zp  = 12;
        break;
      case 7:
        this.zp = 14;
        break;
      case 8:
        this.zp = 16;
        break;
      case 9:
        this.zp = 18;
        break;
      case 10:
        this.zp = 20;
        break;
    }
    if(isVs && this.score > 4 && this.opponentPlayer.score < this.score) {
      this.zp = this.zp * 2;
    }
  }
}
