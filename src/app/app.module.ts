import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/layout/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { GameComponent } from './components/game/game.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LegalComponent } from './components/legal/legal.component';
import { RoomComponent } from './components/room/room.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AdsenseModule } from 'ng2-adsense';
import { RateComponent } from './components/rate/rate.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        CategoryComponent,
        GameComponent,
        QuizComponent,
        FooterComponent,
        QuizListComponent,
        LegalComponent,
        RoomComponent,
        AdminComponent,
        LoginComponent,
        RateComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        Ng2SearchPipeModule,
        ClipboardModule,
        ReactiveFormsModule,
        AdsenseModule.forRoot()
    ],
    providers: [
      {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
      }
    ],
    exports: [
        HeaderComponent,
        CategoryComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
