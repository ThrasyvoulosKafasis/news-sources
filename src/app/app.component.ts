import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsSource } from './model/newsSource';
import { NewsService } from './services/news.service';
import * as _ from 'lodash';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  // variables
  initialSources: NewsSource[] = [];
  newsSources: NewsSource[] = [];
  categories: string[] = [];

  // pagination
  totalPages: number = 0;
  itemsPerPage: number = 6;

  @ViewChild(PaginationComponent)
  child: PaginationComponent = new PaginationComponent;

  constructor(private newsService: NewsService) {
    this.onSearchChannelChanged = _.debounce(this.onSearchChannelChanged, 300);
  }

  ngOnInit() {

    // fetch all news sources from the API
    this.newsService.fetchNews().subscribe((response: any) => {

      // get all news sources
      this.initialSources = [...response.sources];
      this.newsSources = [...response.sources];

      // calculate pagination total page based on initial
      this.totalPages = Math.ceil(this.initialSources.length / this.itemsPerPage);

      // get all categories from news sources
      this.categories = [...new Set(this.initialSources.map(item => item.category))];

      // initial pagination
      let pagination = {
        start: 0,
        end: 1 * this.itemsPerPage,
        reInitArray: false
      };

      this.paginateSources(pagination);

    });

  }

  // get initial array items based on given pagination values
  paginateSources(pagination: any) {
    let sources = pagination.reInitArray ? [...this.initialSources] : this.newsSources;
    this.newsSources = sources.slice(pagination.start, pagination.end);
  }

  // on search channel input change
  onSearchChannelChanged(event: any) {

    let val = event.target.value;

    // reset pagination on pagination component
    this.child.resetPagination();

    this.newsSources = (val) ? [...this.initialSources]
      .filter(item => item.name.toUpperCase().includes(val.toUpperCase())) : [...this.initialSources];

    // calculate pagination total page based on initial
    this.totalPages = Math.ceil(this.newsSources.length / this.itemsPerPage);
  }

  // when selected category changed
  categoryChanged(event: any) {

    let category = event.target.value;

    // reset pagination on pagination component
    this.child.resetPagination();

    this.newsSources = (category) ? [...this.initialSources]
      .filter((item) => item.category === category.toLowerCase()) : [...this.initialSources];

    // calculate pagination total page based on initial
    this.totalPages = Math.ceil(this.newsSources.length / this.itemsPerPage);
  }

}