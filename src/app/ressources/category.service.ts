import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CategoryModel} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  insertCategory(category: any) {
    const option = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post<any>(environment.baseApiUrl + 'category', category, option);
  }

  getCategories(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'categories');
  }

  getCategoryByID(id: string): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/' + id);
  }

  addView(category: CategoryModel) {
    return this.http.post<any>(environment.baseApiUrl + 'category/views', category);
  }

  addRate(rate: any) {
    return this.http.post<any>(environment.baseApiUrl + 'category/rate', rate);
  }

  getRatedCategories(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/rate');
  }

  getViews(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/most/viewed');
  }

  getNewCategories(): Observable <any> {
    return this.http.get<any>(environment.baseApiUrl + 'category/new');
  }
}
