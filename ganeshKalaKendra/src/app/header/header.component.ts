import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: Boolean = true;
  public user: String = localStorage.userType;

  constructor(private service: UtilsService) {
    this.service.loginFlagChange.subscribe((data) => {
      this.isLoggedIn = data;
      this.user = localStorage.userType;
    });
  }

  ngOnInit() {
  }

}
