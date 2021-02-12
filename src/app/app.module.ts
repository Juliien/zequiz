import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';;
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { CategoryComponent } from './category/category.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { GameComponent } from './game/game.component';
import { ScienceComponent } from './quiz/science/science.component';
import {GeneralComponent} from './quiz/general/general.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        CategoryComponent,
        GeneralComponent,
        GameComponent,
        ScienceComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxUiLoaderModule,
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
