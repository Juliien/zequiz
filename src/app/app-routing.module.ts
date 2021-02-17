import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component';
import {QuizListComponent} from './components/quiz-list/quiz-list.component';
import {LegalComponent} from './components/legal/legal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'all', component: QuizListComponent },
  { path: 'legal', component: LegalComponent },
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
