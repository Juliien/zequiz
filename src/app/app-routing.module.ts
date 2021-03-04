import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component';
import {QuizListComponent} from './components/quiz-list/quiz-list.component';
import {LegalComponent} from './components/legal/legal.component';
import {RoomComponent} from './components/room/room.component';
import {SignInComponent} from './components/authentication/sign-in/sign-in.component';
import {SignUpComponent} from './components/authentication/sign-up/sign-up.component';
import {RankComponent} from './components/rank/rank.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'all', component: QuizListComponent },
  { path: 'ranks', component: RankComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
