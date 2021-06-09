import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username: String = '';
  password: String = '';
  public error: Boolean = false;
  public errorMessage: String = '';

  constructor(private router: Router, private utilService: UtilsService) { }

  ngOnInit() {
    this.utilService.setLoginStatus(false);
  }


  login(): void {
    if (this.username === '' || this.password === '') {
      this.error = true;
      this.errorMessage = 'Please enter credentials';
    } else if ((this.username === 'admin' && this.password === 'admin') || (this.username === 'user' && this.password === 'user')) {
      localStorage.userType = this.username.toLowerCase();
      this.utilService.setLoginStatus(true);
      this.router.navigate(['/home']);
    } else {
      this.error = true;
      this.errorMessage = 'Invalid credentials';
    }
  }

}
