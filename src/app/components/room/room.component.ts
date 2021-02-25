import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../ressources/category.service';
import {RoomService} from '../../ressources/room.service';
import {CategoryModel} from '../../models/category.model';
import {RoomModel} from '../../models/room.model';
import {QuizService} from '../../ressources/quiz.service';

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
  quiz: Array<object> = [];
  isCopied: boolean;
  categoryId: string = null;
  error: boolean;

  constructor(private categoryService: CategoryService,
              private quizService: QuizService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.startQuiz = false;
    this.isCopied = false;
    this.error = false;
    if (sessionStorage.getItem('categoryId')) {
      this.categoryId = sessionStorage.getItem('categoryId');
      this.categoryService.getCategoryByID(sessionStorage.getItem('categoryId')).subscribe(cat => this.category = cat);
      this.roomService.getRoomById(sessionStorage.getItem('roomId')).subscribe(room => {
        this.room = room;
        sessionStorage.setItem('playerId', this.room.players[0]);
      });
      this.start();
    } else {
      this.roomService.getRoomById(sessionStorage.getItem('roomId')).subscribe(room => {
        this.room = room;
        sessionStorage.setItem('playerId', this.room.players[1]);
        this.categoryService.getCategoryByID(this.room.quizId).subscribe(cat => {
          this.category = cat;
          if (!this.room.closeDate) {
            this.quizService.quizSelect(this.category.num).subscribe(data => {
              this.quiz.push(data);
              this.startQuiz = true;
            });
          } else {
            this.error = true;
          }
        });
      });
    }
  }

  start() {
    this.interval = setInterval(() => {
      this.roomService.getRoomById(sessionStorage.getItem('roomId')).subscribe(room => {
        this.room = room;
        if (this.room.isStart) {
          if (!this.room.closeDate) {
            this.quizService.quizSelect(this.category.num).subscribe(data => {
              this.quiz.push(data);
              this.startQuiz = true;
              clearInterval(this.interval);
            });
          } else {
            this.error = true;
            clearInterval(this.interval);
          }
        }
      });
    }, 3000);
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
