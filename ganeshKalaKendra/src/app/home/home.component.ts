import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public navLinks: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.navLinks = [
      {
        label: 'Sales',
        path: 'sales'
      },
      {
        label: 'Wholesale Orders',
        path: 'wholesale-orders'
      },
      {
        label: 'Retail Orders',
        path: 'retail-orders'
      }];
    if (localStorage.userType === undefined || localStorage.userType === '') {
      this.router.navigate(['/home']);
    } else if (localStorage.userType === 'admin') {
      this.navLinks = [
        {
          label: 'Sales',
          path: 'sales'
        },
        {
          label: 'Stocks',
          path: 'stocks'
        },
        {
          label: 'Wholesale Orders',
          path: 'wholesale-orders'
        },
        {
          label: 'Retail Orders',
          path: 'retail-orders'
        }];
    }
  }



}
