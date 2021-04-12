import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../ressources/category.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  rateArray: number[] = [];
  index = 0;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    for (let i = 1; i <= 5; i++) {
      this.rateArray.push(i);
    }
  }

  rated(i) {
    const data = {
      _id: sessionStorage.getItem('categoryId'),
      rate: i
    };
    this.categoryService.addRate(data).subscribe(() => {
      this.index = i;
    });
  }
}
