import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router, private utilService: UtilsService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (!this.utilService.getLoginStatus() && event.url !== '/login') {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  ngOnInit() {
    if (this.utilService.getLoginStatus() === undefined) {
      this.utilService.setLoginStatus(false);
    }
  }
}
