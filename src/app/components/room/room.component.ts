import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
  error = false;
  currentPlayer: PlayerModel = null;
  currentUrl: string;
  isMobile: boolean;
  nickname = '';
  currentImage: string;
  images = ['avatar_1.png', 'avatar_2.png', 'avatar_3.png', 'avatar_4.png', 'avatar_5.png', 'avatar_6.png', 'avatar_7.png', 'avatar_8.png'];
  roomId: string;
  socket: any;
  displayResults = false;
  isCopied = false;
  playersScores: PlayerModel[] = [];

  constructor(private categoryService: CategoryService,
              private quizService: QuizService,
              private roomService: RoomService,
              private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.currentImage = this.images[Math.floor(Math.random() * this.images.length)];
    this.currentUrl = document.location.href;
    this.isMobile = window.innerWidth <= 765;

    // websocket
    this.socket = io(environment.socketUrl);

    this.socket.on('room', message => {
      if (message === 'refresh') {
        this.roomService.getRoomById(this.roomId).subscribe(room => {
          this.room = room;
        });
      }
      if (message === 'finished') {
        this.roomService.getRoomById(this.roomId).subscribe(room => {
          const playersHaveEnd = room.players.filter(player => player.score !== -1);
          if (this.room.players.length === playersHaveEnd.length) {
            this.displayResults = true;
            this.playersScores = room.players.sort((a, b) => b.score - a.score);
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
        this.error = true;
      }
    });

    this.socket.on('quit-room', playerId => {
      if (playerId === this.currentPlayer._id) {
        this.error = true;
      }
      const data = {
        roomId: this.roomId,
        playerId: playerId.toString()
      };
      this.roomService.quitRoom(data).subscribe(() => {
        this.socket.emit('room', 'refresh');
      });
    });

    if (sessionStorage.getItem('playerId')) {
      this.playerService.getPlayerById(sessionStorage.getItem('playerId')).subscribe(player => this.currentPlayer = player);
    }

    this.roomId = this.currentUrl.substring(this.currentUrl.lastIndexOf('/') + 1);
    this.roomService.getRoomById(this.roomId).subscribe(room => {
      this.room = room;
      this.categoryService.getCategoryByID(this.room.categoryId).subscribe(category => {
        this.category = category;
      });
    }, err => {
      if (err.status === 404) {
        this.error = true;
      }
    });
  }

  joinRoom() {
    if (this.room.isStart) {
      this.error = true;
    } else {
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
          this.socket.emit('room', 'refresh');
        });
      });
    }
  }

  copied(event) {
    if (event.isSuccess) {
      this.isCopied = true;
    }
  }

  clear() {
    sessionStorage.clear();
  }

  setImage(image) {
    this.currentImage = image;
  }

  startGame() {
    this.roomService.startRoom(this.roomId).subscribe(() => this.socket.emit('room', 'refresh'));
  }

  quitRoom() {
    if (this.currentPlayer) {
      this.clear();
      if (this.currentPlayer.isOwner) {
        this.roomService.closeRoom(this.room._id).subscribe(() => this.socket.emit('room', 'closed'));
      } else {
        this.socket.emit('quit-room', this.currentPlayer._id);
      }
    }
  }

  ngOnDestroy() {
    this.quitRoom();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler() {
    this.quitRoom();
  }
}
