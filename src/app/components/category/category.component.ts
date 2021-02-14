import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import categories from '../../ressources/categories.json';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  innerWidth: number;
  categories: CategoryModel[];
  @Input() categoryEnd: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.categories = categories;
    if (this.categoryEnd === undefined || this.categoryEnd === null) {
      this.categoryEnd = this.categories.length;
    }
  }

  gotToQuiz(name, num) {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('num', num);
    this.router.navigate(['quiz']).then();
  }
}
