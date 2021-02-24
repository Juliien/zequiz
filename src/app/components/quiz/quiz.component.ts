import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../ressources/quiz.service';
import {CategoryService} from '../../ressources/category.service';
import {CategoryModel} from '../../models/category.model';
import {Router} from '@angular/router';
import {RoomService} from '../../ressources/room.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Array<object> = [];
  game = false;
  category: CategoryModel;

  constructor(private quizService: QuizService,
              private categoryService: CategoryService,
              private roomService: RoomService,
              private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategoryByID(sessionStorage.getItem('categoryId'))
      .subscribe(category => this.category = category);
  }

  startQuiz() {
    this.categoryService.addView(this.category).subscribe();
    this.quizService.quizSelect(this.category.num).subscribe(data => {
      this.quiz.push(data);
      this.game = true;
    });
  }

  goToVS() {
    this.categoryService.addView(this.category).subscribe();
    this.roomService.createRoom(this.category._id).subscribe(room => {
      sessionStorage.setItem('roomId', room._id);
      this.router.navigate(['/room', room._id]).then();
    });
  }
}
