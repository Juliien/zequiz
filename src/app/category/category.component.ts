import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public innerWidth: number;

  public categories = [
    {name: 'General Knowledge', num: '9' },
    {name: 'Science & Nature', num: '17'},
    {name: 'History', num: '23'},
    {name: 'Animals', num: '27'}
    ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  gotToQuiz(name, num) {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('num', num);
    this.router.navigate(['quiz']).then();
  }
}
