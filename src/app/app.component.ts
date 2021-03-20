import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private meta: Meta,
              private titleService: Title) {
  }
  ngOnInit() {
    this.titleService.setTitle('ZeQuiz - Multiplayer Quiz Platform');
    this.meta.addTags([
      { name: 'keywords', content: 'zequiz, Zequiz, ZeQuiz, zequiz.net, ZeQuiz english quiz platform, ' +
          'zequiz platform, quiz, quizzes, online quiz, multiplayer quiz, ZEQUIZ' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Da Corte Julien' }
    ]);
    this.meta.updateTag(
      { name: 'description', content: 'ZeQuiz is a multiplayer quiz game. Play alone or online with your friends. ' +
          'Discover a series of fun quizzes about video games, animals, cartoons, manga, geography, history, sciences, sports etc...'
      });
  }
}
