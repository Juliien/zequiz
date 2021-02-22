import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CategoryModel} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'categories');
  }

  getCategoryByID(id: string): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/' + id);
  }

  addView(category: CategoryModel) {
    return this.http.post<any>(environment.baseApiUrl + 'category/views', category);
  }
}
