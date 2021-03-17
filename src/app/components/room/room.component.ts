import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../ressources/category.service';
import {RoomService} from '../../ressources/room.service';
import {CategoryModel} from '../../models/category.model';
import {RoomModel} from '../../models/room.model';
import {QuizService} from '../../ressources/quiz.service';
import {PlayerService} from '../../ressources/player.service';
import {PlayerModel} from '../../models/player.model';

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
  player: PlayerModel;

  constructor(private categoryService: CategoryService,
              private quizService: QuizService,
              private roomService: RoomService,
              private playerService: PlayerService) { }

  ngOnInit(): void {
    this.startQuiz = false;
    this.isCopied = false;
    this.error = false;

    // this.socket.on('room-broadcast', (data: string) => {
    //   if(data === 'ready') {
    //     this.startQuiz = true;
    //   }
    // });

    if(sessionStorage.getItem('roomId')) {
      this.roomService.getRoomById(sessionStorage.getItem('roomId')).subscribe(room => {
        this.room = room;
        this.copy = true;
        this.categoryService.getCategoryByID(this.room.categoryId).subscribe(cat => this.category = cat);
        this.playerService.getPlayerById(sessionStorage.getItem('playerId')).subscribe(player => this.player = player);
      });
    } else {
      // Localhost
      const id = document.location.href.slice(29);
      // const id = document.location.href.slice(30);
      this.roomService.getRoomById(id).subscribe(room => {
        this.room = room;
        this.categoryService.getCategoryByID(this.room.categoryId).subscribe(cat => {
          this.category = cat;
        });
      });
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

  }
}
