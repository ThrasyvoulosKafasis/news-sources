import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NewsSource } from '../model/newsSource';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http: HttpClient) { }

  fetchNews() {
    return this.http.get('https://newsapi.org/v1/sources');
  }
}
