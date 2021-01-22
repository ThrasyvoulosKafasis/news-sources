import { Component, Input, OnInit } from '@angular/core';
import { NewsSource } from 'src/app/model/newsSource';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  @Input()
  newsSource!: NewsSource;

  constructor() { }

  ngOnInit(): void {
  }

}
