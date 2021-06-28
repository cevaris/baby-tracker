import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

type FormData = {
  userName: string
  userPassword: string
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  formError: string;
  submitting: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'userName': new FormControl('', [Validators.required, Validators.email]),
      'userPassword': new FormControl('', [Validators.required])
    });
  }

  async onSubmit() {
    this.submitting = true;

    try {
      const data: FormData = this.form.value
      await this.authService.signIn(data.userName, data.userPassword);
    } finally {
      this.submitting = false;
    }
  }

  async googleAuth() {
    this.authService.googleAuth();
  }
}
