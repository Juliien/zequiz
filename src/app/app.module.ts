import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';;
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/layout/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GameComponent } from './components/game/game.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import {FormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        CategoryComponent,
        GameComponent,
        QuizComponent,
        FooterComponent,
        QuizListComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    exports: [
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
