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

  gotToQuiz(name: string, num: number, url: string) {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('num', num.toString());
    sessionStorage.setItem('photoUrl', url);
    this.router.navigate(['quiz']).then();
  }
}
