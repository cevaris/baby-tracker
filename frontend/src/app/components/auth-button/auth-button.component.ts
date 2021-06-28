import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {
  user$: Observable<User>;

  constructor(public authService: AuthService) {
    this.user$ = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  logout() {
  }

}
