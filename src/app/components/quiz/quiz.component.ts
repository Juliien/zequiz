import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../ressources/quiz.service';
import {CategoryService} from '../../ressources/category.service';
import {CategoryModel} from '../../models/category.model';
import {Router} from '@angular/router';
import {RoomService} from '../../ressources/room.service';
import {PlayerService} from '../../ressources/player.service';
import {environment} from '../../../environments/environment';
import cryptoJS from 'crypto-js';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: any[];
  game = false;
  category: CategoryModel;
  categoryRate = 0;
  zeQuiz = false;
  isMobile: boolean;
  nickname = '';
  currentImage: string;
  images = ['avatar_1.png', 'avatar_2.png', 'avatar_3.png', 'avatar_4.png', 'avatar_5.png', 'avatar_6.png', 'avatar_7.png', 'avatar_8.png'];

  constructor(private quizService: QuizService,
              private categoryService: CategoryService,
              private playerService: PlayerService,
              private roomService: RoomService,
              private router: Router) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 765;
    this.currentImage = this.images[Math.floor(Math.random() * this.images.length)];

    if (sessionStorage.getItem('categoryId')) {
      this.categoryService.getCategoryByID(sessionStorage.getItem('categoryId'))
        .subscribe(category => {
          this.category = category;
          if (this.category.rate.length > 0) {
            this.categoryRate = this.category.rate.reduce((a, b) => (a + b)) / this.category.rate.length;
          }
        });
    } else {
      this.router.navigate(['/home']).then();
    }
  }

  getQuiz(isVs: boolean) {
    this.categoryService.addView(this.category).subscribe();
    this.quizService.quizSelect(this.category.num).subscribe(data => {
      const bytes = cryptoJS.AES.decrypt(data, environment.SECRET_KEY);
      this.quiz = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
      if (isVs) {
        this.zeQuiz = true;
      } else {
        this.game = true;
      }
    });
  }

  setImage(image) {
    this.currentImage = image;
  }

  createRoom() {
    const owner = {
      nickname: this.nickname,
      photoUrl: this.currentImage,
      isOwner: true
    };
    this.playerService.createPlayer(owner).subscribe(player => {
      sessionStorage.setItem('playerId', player._id);
      const newRoom = {
        categoryId: this.category._id,
        quiz: this.quiz,
        playerId: player._id
      };
      this.roomService.createRoom(newRoom).subscribe(room => {
            sessionStorage.setItem('roomId', room._id);
            this.router.navigate(['/room', room._id]).then();
      });
    });
  }
}
