import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {QuizComponent} from './components/quiz/quiz.component';
import {QuizListComponent} from './components/quiz-list/quiz-list.component';
import {LegalComponent} from './components/legal/legal.component';
import {RoomComponent} from './components/room/room.component';
import {AdminComponent} from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'all', component: QuizListComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'admin', component: AdminComponent },
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
