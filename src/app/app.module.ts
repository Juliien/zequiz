import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/layout/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GameComponent } from './components/game/game.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { LegalComponent } from './components/legal/legal.component';
import { DonationComponent } from './components/donation/donation.component';
import { RoomComponent } from './components/room/room.component';
import {ClipboardModule} from 'ngx-clipboard';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { RankComponent } from './components/rank/rank.component';
import { ProfileComponent } from './components/profile/profile.component';

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
        DonationComponent,
        RoomComponent,
        SignInComponent,
        SignUpComponent,
        RankComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxUiLoaderModule,
        FormsModule,
        Ng2SearchPipeModule,
        ClipboardModule,
        ReactiveFormsModule,
    ],
    providers: [],
    exports: [
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
