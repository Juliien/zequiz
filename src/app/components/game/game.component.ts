import {Component, Input, OnInit} from '@angular/core';
import {QuizModel} from '../../models/quiz.model';
import {Router} from '@angular/router';
import {PlayerService} from '../../ressources/player.service';
import {PlayerModel} from '../../models/player.model';
import {RoomModel} from '../../models/room.model';
import {RoomService} from '../../ressources/room.service';
import {UserService} from '../../ressources/user.service';
import {AuthenticationService} from '../../ressources/authentication.service';

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
  interval: any;
  displaySpinner: boolean;
  zp: number;

  constructor(private router: Router,
              private playerService: PlayerService,
              private userService: UserService,
              private roomService: RoomService,
              public authenticationService: AuthenticationService) { }

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
    if(this.authenticationService.isLogged()) {
      this.calculateZp(false);
      this.userService.updateScore(this.score, -1).subscribe(user => {
        this.userService.currentUser = user;
      });
    }
    this.result = true;
  }

  displayVSResult() {
    if(this.authenticationService.isLogged()) {
      this.calculateZp(true);
      this.userService.updateScore(this.score, this.opponentPlayer.score,).subscribe(user => {
        this.userService.currentUser = user;
      });
    }
    this.result = true;
    this.playerService.updateScore(sessionStorage.getItem('playerId'), this.score).subscribe();
    this.playerService.playerEndQuiz(sessionStorage.getItem('playerId')).subscribe();
    this.end();
  }

  end() {
    this.displaySpinner = true;
    this.interval = setInterval(() => {
      if (this.room.players[0] === sessionStorage.getItem('playerId')) {
        this.getPlayer(this.room.players[1]);
      } else {
        this.getPlayer(this.room.players[0]);
      }
    }, 3000);
  }

  getPlayer(id) {
    this.playerService.getPlayerById(id).subscribe(player => {
      this.opponentPlayer = player;
      if (this.opponentPlayer.isEnd) {
        this.roomService.closeRoom(this.room._id).subscribe();
        this.displaySpinner = false;
        clearInterval(this.interval);
      }
    });
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
