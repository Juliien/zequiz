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
  @Input() isMobile: boolean;

  constructor(private router: Router) { }

  gotToQuiz(id: string) {
    sessionStorage.setItem('categoryId', id);
    this.router.navigate(['quiz']).then();
  }
}
