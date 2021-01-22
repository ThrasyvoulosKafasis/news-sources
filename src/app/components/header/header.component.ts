import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = {
    name: 'Thrasyvoulos',
    surname: 'Kafasis'
  }

  constructor() { }

  ngOnInit(): void {
  }

  userInitials() {
    return `${this.user.name.charAt(0).toUpperCase()}${this.user.surname.charAt(0).toUpperCase()}`;
  }

}
