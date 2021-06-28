import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user$: Observable<User>;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public authService: AuthService) {
    this.user$ = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.signOut();
    this.sidenav.toggle()
  }
}
