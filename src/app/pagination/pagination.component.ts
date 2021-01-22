import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input()
  totalPages: number = 0;

  @Input()
  itemsPerPage: number = 0;

  @Output()
  paginationChanged = new EventEmitter<object>();

  // variables
  currentPage: number = 1;

  constructor() { }

  ngOnInit() {
    this.setPaginationProperties();
  }

  // set pagination properties
  setPaginationProperties(reInitArray: boolean = true) {

    console.log('setPaginationProperties', this.itemsPerPage, this.totalPages);

    let pagination = {
      start: (this.currentPage - 1) * this.itemsPerPage,
      end: this.currentPage * this.itemsPerPage,
      reInitArray: reInitArray
    };

    console.log(pagination);

    this.paginationChanged.emit(pagination);
  }

  // prev page button clicked
  prevPageBtnClicked() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginationProperties();
    }
  };

  // next page button clicked
  nextPageBtnClicked() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginationProperties();
    }
  }

  // change on pagination field
  paginationInputChange(event: any) {
    if (event.target.value) {
      this.currentPage = event.target.value;

      if (this.currentPage >= 1 && this.currentPage <= this.totalPages) {
        this.setPaginationProperties();
      }
    }
  }

  // reset pagination
  resetPagination() {
    this.currentPage = 1;
    this.setPaginationProperties(false);
  }

}
