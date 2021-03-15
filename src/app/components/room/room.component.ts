import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../ressources/category.service';
import {RoomService} from '../../ressources/room.service';
import {CategoryModel} from '../../models/category.model';
import {RoomModel} from '../../models/room.model';
import {QuizService} from '../../ressources/quiz.service';
import {PlayerService} from '../../ressources/player.service';
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
  interval: any;
  copy: boolean = false;
  isCopied: boolean;
  error: boolean;
  socket: any;

  constructor(private categoryService: CategoryService,
              private quizService: QuizService,
              private roomService: RoomService,
              private playerService: PlayerService) { }

  ngOnInit(): void {
    this.startQuiz = false;
    this.isCopied = false;
    this.error = false;

    this.socket = io(environment.socketUrl);

    this.socket.on('room-broadcast', (data: string) => {
      if(data === 'ready') {
        this.startQuiz = true;
      }
    });

    if(sessionStorage.getItem('roomId')) {
      this.roomService.getRoomById(sessionStorage.getItem('roomId')).subscribe(room => {
        this.room = room;
        this.copy = true;
        sessionStorage.setItem('playerId', this.room.players[0]);
        this.categoryService.getCategoryByID(this.room.quizId).subscribe(cat => this.category = cat);
      });
    } else {
      // Localhost
      const id = document.location.href.slice(29);
      // const id = document.location.href.slice(30);
      this.roomService.joinRoom(id).subscribe(() => {
        this.roomService.getRoomById(id).subscribe(room => {
          this.room = room;
          sessionStorage.setItem('playerId', this.room.players[1]);
          this.categoryService.getCategoryByID(this.room.quizId).subscribe(cat => {
            this.category = cat;
            this.socket.emit('room', 'ready');
          });
        });
      });
    }
  }

  quit() {
    clearInterval(this.interval);
    this.roomService.closeRoom(sessionStorage.getItem('roomId')).subscribe();
    this.playerService.playerEndQuiz(sessionStorage.getItem('playerId')).subscribe();
  }

  copied(event) {
    if (event.isSuccess) {
      return this.isCopied = true;
    }
  }

  clear() {
    sessionStorage.clear();
  }

}
