import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() category: CategoryModel;

  constructor(private router: Router) { }

  gotToQuiz(name, num, url) {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('num', num);
    sessionStorage.setItem('url', url);
    this.router.navigate(['quiz']).then();
  }
}
