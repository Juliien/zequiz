import { Component, OnInit } from '@angular/core';
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
export class RoomComponent implements OnInit {
  category: CategoryModel;
  room: RoomModel;
  startQuiz: boolean;
  isCopied: boolean;
  error: boolean;
  players: PlayerModel[];
  isOwner = false;
  currentPlayer: PlayerModel = null;
  isMobile: boolean;
  nickname = '';
  currentImage: string;
  images: string[];
  isReady = false;
  roomId: string;
  socket:any;

  constructor(private categoryService: CategoryService,
              private quizService: QuizService,
              private roomService: RoomService,
              private playerService: PlayerService,
              ) {}

  ngOnInit(): void {
    this.startQuiz = false;
    this.isCopied = false;
    this.error = false;
    this.isMobile = window.innerWidth <= 765;

    // websocket
    this.socket = io(environment.socketUrl);
    this.socket.on('room', message => {
      if(message === 'joined') {
        this.roomService.getRoomById(this.roomId).subscribe(room => {
          this.room = room;
          this.players = this.room.players;
        });
      }
    });


    if(sessionStorage.getItem('roomId')) {
      this.roomId = sessionStorage.getItem('roomId');
      this.roomService.getRoomById(sessionStorage.getItem('roomId')).subscribe(room => {
        this.room = room;
        this.players = this.room.players;
        this.categoryService.getCategoryByID(this.room.categoryId).subscribe(cat => this.category = cat);
        this.playerService.getPlayerById(sessionStorage.getItem('playerId')).subscribe(player => this.currentPlayer = player);
      });
    } else {
      // Localhost
      const id = document.location.href.slice(29);
      // const id = document.location.href.slice(30);
      this.roomId = id;
      this.currentImage ='avatar_1.png';
      this.images = ['avatar_1.png', 'avatar_2.png', 'avatar_3.png', 'avatar_4.png',
        'avatar_5.png', 'avatar_6.png', 'avatar_7.png', 'avatar_8.png'];
      this.roomService.getRoomById(id).subscribe(room => {
        this.room = room;
        this.players = this.room.players;
        this.categoryService.getCategoryByID(this.room.categoryId).subscribe(cat => {
          this.category = cat;
        });
      });
      if(sessionStorage.getItem('playerId')) {
        this.playerService.getPlayerById(sessionStorage.getItem('playerId')).subscribe(player => this.currentPlayer = player);
      }
    }
  }

  quit() {
    this.roomService.closeRoom(sessionStorage.getItem('roomId')).subscribe();
  }

  copied(event) {
    if (event.isSuccess) {
      return this.isCopied = true;
    }
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
  setReady() {
    this.isReady = true;
  }
}
