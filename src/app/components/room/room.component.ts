import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../ressources/category.service';
import {RoomService} from '../../ressources/room.service';
import {CategoryModel} from '../../models/category.model';
import {RoomModel} from '../../models/room.model';
import {QuizService} from '../../ressources/quiz.service';
import {PlayerService} from '../../ressources/player.service';
import {PlayerModel} from '../../models/player.model';
import io from 'socket.io-client';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  category: CategoryModel;
  room: RoomModel;
  startQuiz: boolean;
  error: boolean;
  currentPlayer: PlayerModel = null;
  isMobile: boolean;
  nickname = '';
  currentImage = 'avatar_1.png';
  images = ['avatar_1.png', 'avatar_2.png', 'avatar_3.png', 'avatar_4.png', 'avatar_5.png', 'avatar_6.png', 'avatar_7.png', 'avatar_8.png'];
  roomId: string;
  socket: any;
  alertOwner: boolean;
  displayResults = false;
  playersScores: PlayerModel[] = [];

  constructor(private categoryService: CategoryService,
              private quizService: QuizService,
              private roomService: RoomService,
              private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.startQuiz = false;
    this.error = false;
    this.isMobile = window.innerWidth <= 765;
    this.alertOwner = false;

    // websocket
    this.socket = io(environment.socketUrl);
    this.socket.on('room', message => {
      if (message === 'joined' || message === 'ready' || message === 'leave') {
        this.roomService.getRoomById(this.roomId).subscribe(room => {
          this.room = room;
        });
      }
      if (message === 'start') {
        this.startQuiz = true;
      }
      if (message === 'finished') {
        this.roomService.getRoomById(this.roomId).subscribe(room => {
          const playersHaveEnd = room.players.filter(player => player.score !== -1);
          if (this.room.players.length === playersHaveEnd.length) {
            this.displayResults = true;
            this.playersScores = room.players.sort(
              (a, b) => b.score - a.score);
          } else {
            for (const player of playersHaveEnd) {
              if (player._id === this.currentPlayer._id) {
                this.currentPlayer.score = player.score;
              }
            }
          }
        });
      }
      if (message === 'closed') {
        this.clear();
        this.error = true;
      }
    });

    this.socket.on('quit-room', playerId => {
      const data = {
        roomId: this.roomId,
        playerId: playerId.toString()
      };

      this.roomService.quitRoom(data).subscribe(() => {
        this.clear();
        this.socket.emit('room', 'leave');
      });
    });


    if (sessionStorage.getItem('roomId')) {
      this.roomId = sessionStorage.getItem('roomId');
      this.roomService.getRoomById(sessionStorage.getItem('roomId')).subscribe(room => {
        this.room = room;
        const playersHaveEnd = room.players.filter(player => player.score !== -1);
        if (this.room.players.length === playersHaveEnd.length) {
          this.displayResults = true;
          this.playersScores = room.players.sort(
            (a, b) => b.score - a.score);
        }
        this.categoryService.getCategoryByID(this.room.categoryId).subscribe(cat => this.category = cat);
        this.playerService.getPlayerById(sessionStorage.getItem('playerId')).subscribe(player => this.currentPlayer = player);
      }, err => {
        if (err.status === 404) {
          this.error = true;
        }
      });
    } else {
      const id = document.location.href.substring(document.location.href.lastIndexOf('/') + 1);
      this.roomId = id;
      this.roomService.getRoomById(id).subscribe(room => {
        this.room = room;
        this.categoryService.getCategoryByID(this.room.categoryId).subscribe(cat => {
          this.category = cat;
        });
      }, err => {
        if (err.status === 404) {
          this.error = true;
        }
      });
      if (sessionStorage.getItem('playerId')) {
        this.playerService.getPlayerById(sessionStorage.getItem('playerId')).subscribe(player => this.currentPlayer = player);
      }
    }
  }

  quit() {
    this.roomService.closeRoom(this.room._id).subscribe(() => {
      this.socket.emit('room', 'closed');
    });
  }

  clear() {
    sessionStorage.clear();
  }

  joinRoom() {
    const player = {
      nickname: this.nickname,
      photoUrl: this.currentImage,
      isOwner: false
    };
    this.playerService.createPlayer(player).subscribe(currentPlayer => {
      sessionStorage.setItem('playerId', currentPlayer._id);
      this.currentPlayer = currentPlayer;
      const joinRoom = {
        roomId: this.room._id,
        playerId: this.currentPlayer._id
      };
      this.roomService.joinRoom(joinRoom).subscribe(() => {
        this.socket.emit('room', 'joined');
      });
    });
  }

  setImage(image) {
    this.currentImage = image;
  }

  startGame() {
    const playersReady = this.room.players.filter(player => !player.isReady);
    if (playersReady.length > 0) {
      this.alertOwner = true;
    } else {
      this.alertOwner = false;
      this.socket.emit('room', 'start');
      this.startQuiz = true;
    }
  }

  setReady() {
    this.playerService.playerIsReady(this.currentPlayer._id).subscribe(() => {
      this.playerService.getPlayerById(this.currentPlayer._id).subscribe(player => this.currentPlayer = player);
      this.socket.emit('room', 'ready');
    });
  }

  ngOnDestroy() {
    if (this.currentPlayer) {
      if (this.currentPlayer.isOwner) {
        this.quit();
      }
      this.socket.emit('quit-room', this.currentPlayer._id);
    }
  }
}
